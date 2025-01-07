import {REFRESHTOKEN} from "~/utils/constants/constants";
//@ts-ignore
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const refreshToken = getCookie(event, REFRESHTOKEN);
  try {
    const verifiedToken = jwt.verify(
      refreshToken + "",
      config.refreshTokenKey
    ) as {
      uid: string;
    };
    return verifiedToken.uid;
  } catch (error) {
    const err = error as Error;
  }
});
