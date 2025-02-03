import prisma from "~/lib/prisma";
import {ACCESSTOKEN, REFRESHTOKEN} from "~/utils/constants/constants";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const accessToken = getCookie(event, ACCESSTOKEN);

  try {
    const verifiedToken = await unsealSession(
      event,
      {name: ACCESSTOKEN, password: config.ACCESS_TOKEN_KEY},
      accessToken + ""
    );

    const exsistUser = await prisma.user.findFirst({
      where: {id: verifiedToken.data?.uid},
      select: {id: true},
    });
    if (!exsistUser) {
      deleteCookie(event, ACCESSTOKEN);
      deleteCookie(event, REFRESHTOKEN);
      return null;
    }

    return verifiedToken.data?.uid;
  } catch (error) {
    const err = error as Error;
    // console.log("getUid err", err.message);
  }
});
