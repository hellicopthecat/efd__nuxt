import type {InferType} from "yup";
import {object, ref, string} from "yup";
import {EMAILREGEX, PASSREGEX, UIDREGEX} from "~/utils/constants/regex";
import bcrypt from "bcrypt";
import prisma from "~/lib/prisma";
import jwt from "jsonwebtoken";

let userSchema = object({
  uid: string()
    .matches(UIDREGEX, {message: "조건과 일치하지 않습니다."})
    .required("아이디를 입력하지 않았습니다."),
  email: string()
    .email()
    .matches(EMAILREGEX, {message: "조건과 일치하지 않습니다."})
    .required("이메일을 입력하지 않았습니다."),
  name: string(),
  password: string()
    .matches(PASSREGEX, {message: "조건과 일치하지 않습니다."})
    .required("비밀번호를 입력하지 않았습니다."),
  checkPass: string()
    .matches(PASSREGEX, {message: "조건과 일치하지 않습니다."})
    .required("2차 확인 비밀번호를 입력하지 않았습니다.")
    .oneOf([ref("password")], "비밀번호가 일치하지 않습니다."),
});

type User = InferType<typeof userSchema>;

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const params: User = await readBody(event);
  try {
    const results = await userSchema.validate(params);
    const existUser = await prisma.user.findFirst({
      where: {OR: [{uid: results.uid}, {email: results.email}]},
      select: {uid: true, email: true},
    });
    if (existUser?.uid === results.uid) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "사용하는 아이디 입니다.",
      });
    } else if (existUser?.email === results.email) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "사용하는 이메일 입니다.",
      });
    }
    const hashPassword = await bcrypt.hash(results.password, 10);
    const user = await prisma.user.create({
      data: {
        uid: results.uid,
        email: results.email,
        name: results.name,
        password: hashPassword,
      },
    });
    const token = jwt.sign({id: user.id, uid: user.uid}, config.cookieKEY);

    setCookie(event, "AccessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return {
      success: true,
    };
  } catch (error) {
    const err = error as Error;
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: err.message,
    });
  }
});
