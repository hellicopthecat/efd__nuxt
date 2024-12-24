import prisma from "~/lib/prisma";
import {ACCESSTOKEN, REFRESHTOKEN} from "~/utils/constants/constants";
//@ts-ignore
import bcrypt from "bcrypt";
//@ts-ignore
import jwt from "jsonwebtoken";

interface ILoginType {
  uid: string;
  password: string;
}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const formData: ILoginType = await readBody(event);
  try {
    const user = await prisma.user.findUnique({
      where: {uid: formData.uid},
      select: {id: true, uid: true, password: true},
    });

    if (user?.uid !== formData.uid) {
      throw createError({
        status: 400,
        statusMessage: "Bad Requeset",
        message: "유저가 존재하지 않습니다.",
      });
    }
    const comparePassword = await bcrypt.compare(
      formData.password,
      user.password + ""
    );
    if (!comparePassword) {
      throw createError({
        status: 400,
        statusMessage: "Bad Requeset",
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
    //TOKEN
    const payload = {uid: user.id};
    //Refresh TOKEN
    const refreshToken = jwt.sign(payload, config.refreshTokenKey);
    setCookie(event, REFRESHTOKEN, refreshToken, {
      httpOnly: true,
      sameSite: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    const accessToken = jwt.sign({uid: user.id}, config.accessTokenKey);
    setCookie(event, ACCESSTOKEN, accessToken, {
      httpOnly: false,
      sameSite: true,
      secure: true,
      maxAge: 60 * 60 * 3,
      path: "/",
    });

    return {
      ok: true,
      id: user.id,
    };
  } catch (error) {
    const err = error as Error;
    console.log("backend", err.message);
    throw createError({
      status: 400,
      statusMessage: "Bad Requeset",
      message: err.message || "로그인 시 알수없는 오류가 발생했습니다.",
    });
  }
});
