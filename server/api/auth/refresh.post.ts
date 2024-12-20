import {REFRESHTOKEN} from "~/utils/constants/constants";
//@ts-ignore
import jwt from "jsonwebtoken";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  try {
    const refreshToken = getCookie(event, REFRESHTOKEN);
    const verifiyRefresh = jwt.verify(
      refreshToken + "",
      config.refreshTokenKey
    ) as {uid: string};
    const accessToken = jwt.sign(
      {uid: verifiyRefresh.uid},
      config.accessTokenKey
    );
    return accessToken;
  } catch (error) {
    const err = error as Error;
    console.log("refreshPost ::", err.message);
    throw createError(err.message);
  }
});
