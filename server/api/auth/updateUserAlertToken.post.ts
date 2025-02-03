import prisma from "~/lib/prisma";
import {ACCESSTOKEN, REFRESHTOKEN} from "~/utils/constants/constants";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  const accessToken = getCookie(event, ACCESSTOKEN);
  const refreshToken = getCookie(event, REFRESHTOKEN);
  try {
    if (refreshToken) {
      const verifiedToken = await unsealSession(
        event,
        {name: ACCESSTOKEN, password: config.ACCESS_TOKEN_KEY},
        accessToken + ""
      );
      await prisma.user.update({
        where: {id: Number(verifiedToken.data?.uid)},
        data: {alertToken: body.token},
      });
    } else {
      return;
    }
  } catch (error) {
    const err = error as Error;
  }
});
