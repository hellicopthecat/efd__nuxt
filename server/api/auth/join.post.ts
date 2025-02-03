import type {InferType} from "yup";
import {object, ref, string} from "yup";
import {EMAILREGEX, PASSREGEX, UIDREGEX} from "~/utils/constants/regex";
import prisma from "~/lib/prisma";
import {ACCESSTOKEN, REFRESHTOKEN} from "~/utils/constants/constants";
//@ts-ignore
import bcrypt from "bcrypt";

const userSchema = object({
  uid: string()
    .matches(UIDREGEX, {message: "아이디 조건과 일치하지 않습니다."})
    .required("아이디를 입력하지 않았습니다."),
  email: string()
    .email()
    .matches(EMAILREGEX, {message: "이메일 조건과 일치하지 않습니다."})
    .required("이메일을 입력하지 않았습니다."),
  name: string(),
  password: string()
    .matches(PASSREGEX, {message: "비밀번호 조건과 일치하지 않습니다."})
    .required("비밀번호를 입력하지 않았습니다."),
  checkPass: string()
    .matches(PASSREGEX, {message: "비밀번호 조건과 일치하지 않습니다."})
    .required("2차 확인 비밀번호를 입력하지 않았습니다.")
    .oneOf([ref("password")], "비밀번호가 일치하지 않습니다."),
  addressData: object({
    sido: string(),
    sigungu: string(),
    bname: string(),
    bname1: string(),
    roadAddress: string(),
    buildingName: string(),
    zonecode: string(),
  }),
  restAddress: string(),
  alertToken: string(),
});

type User = InferType<typeof userSchema>;

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const params: User = await readBody(event);
  try {
    const results = await userSchema.validate(params);
    if (results) {
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
          alertToken: results.alertToken,
          address: {
            create: {
              sido: results.addressData.sido + "",
              sigungu: results.addressData.sigungu + "",
              zonecode: results.addressData.zonecode + "",
              bname: results.addressData.bname + "",
              bname1: results.addressData.bname1 + "",
              roadAddress: results.addressData.roadAddress + "",
              buildingNmae: results.addressData.buildingName + "",
              restAddress: results.restAddress,
            },
          },
        },
      });
      const userInfo = {
        uid: user.id,
        alertToken: user.alertToken,
      };
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
          maxAge: 60 * 60 * 3,
          path: "/",
        },
      });
      await accessToken.update(userInfo);

      return {
        success: true,
        id: user.id,
      };
    }
  } catch (error) {
    const err = error as Error;
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: err.message,
    });
  }
});
