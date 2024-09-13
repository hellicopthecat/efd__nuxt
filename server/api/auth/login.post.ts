import prisma from "~/lib/prisma";
import bcrypt from "bcrypt";
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
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "유저가 존재하지 않습니다.",
      });
    }
    const comparePassword = await bcrypt.compare(
      formData.password,
      user.password + ""
    );
    if (!comparePassword) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "비밀번호가 틀렸습니다.",
      });
    }
    const token = jwt.sign({id: user.id, uid: user.uid}, config.cookieKEY);

    setCookie(event, "AccessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return {
      success: true,
    };
  } catch (err) {
    const errMsg = (err as Error).message;
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: errMsg,
    });
  }
});
