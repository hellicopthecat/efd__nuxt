import {ACCESSTOKEN} from "~/utils/constants/constants";
//@ts-ignore
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const accessToken = getCookie(event, ACCESSTOKEN);
  try {
    const verifiedToken = jwt.verify(
      accessToken + "",
      config.accessTokenKey
    ) as {
      uid: string;
    };
    return verifiedToken.uid;
  } catch (error) {
    const err = error as Error;
  }
});
