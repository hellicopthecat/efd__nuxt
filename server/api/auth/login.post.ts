import prisma from "~/lib/prisma";
import {ACCESSTOKEN, REFRESHTOKEN} from "~/utils/constants/constants";
//@ts-ignore
import bcrypt from "bcrypt";

interface ILoginType {
  uid: string;
  password: string;
  token: string;
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
    // Save FCM TOKEN
    await prisma.user.update({
      where: {id: user.id},
      data: {alertToken: formData.password},
    });
    //TOKEN
    const userInfo = {uid: user.id, alertToken: formData.token};
    //Refresh Token
    const refreshToken = await useSession(event, {
      name: REFRESHTOKEN,
      password: config.REFRESH_TOKEN_KEY,
      cookie: {
        httpOnly: true,
        sameSite: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      },
    });
    await refreshToken.update(userInfo);
    //Access Token
    const accessToken = await useSession(event, {
      name: ACCESSTOKEN,
      password: config.ACCESS_TOKEN_KEY,
      cookie: {
        httpOnly: false,
        sameSite: true,
        secure: true,
        maxAge: 60 * 60 * 5,
        // maxAge: 10,
        path: "/",
      },
    });
    await accessToken.update(userInfo);

    return {
      ok: true,
      errMsg: null,
      id: user.id,
    };
  } catch (error) {
    const err = error as Error;
    return {
      ok: false,
      errMsg: err.message || "로그인 시 알수없는 오류가 발생했습니다.",
      id: "null",
    };
  }
});
