import type {InferType} from "yup";
import {object, ref, string} from "yup";
import {EMAILREGEX, PASSREGEX, UIDREGEX} from "~/utils/constants/regex";

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
  const params: User = await readBody(event);
  try {
    const results = userSchema.validateSync(params);
  } catch (error) {
    const err = error as Error;
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: err.message,
    });
  }
});
