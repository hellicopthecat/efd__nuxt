import {ACCESSTOKEN, REFRESHTOKEN} from "~/utils/constants/constants";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const refreshToken = getCookie(event, REFRESHTOKEN);

  try {
    const verifiedToken = await unsealSession(
      event,
      {name: REFRESHTOKEN, password: config.REFRESH_TOKEN_KEY},
      refreshToken + ""
    );
    const accessToken = await useSession(event, {
      name: ACCESSTOKEN,
      password: config.ACCESS_TOKEN_KEY,
      cookie: {
        httpOnly: false,
        sameSite: true,
        secure: true,
        maxAge: 60 * 60 * 5,
        path: "/",
      },
    });
    await accessToken.update(verifiedToken.data!);
    return {
      ok: true,
      errMsg: null,
    };
  } catch (error) {
    const err = error as Error;
    // console.log("refreshPost ::", err.message);
    return {
      ok: false,
      errMsg: err.message,
    };
  }
});
