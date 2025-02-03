import prisma from "~/lib/prisma";
import {ACCESSTOKEN} from "~/utils/constants/constants";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  const accessToken = getCookie(event, ACCESSTOKEN);
  try {
    const verifiedToken = await unsealSession(
      event,
      {name: ACCESSTOKEN, password: config.ACCESS_TOKEN_KEY},
      accessToken + ""
    );

    await prisma.user.update({
      where: {id: Number(verifiedToken.data?.uid)},
      data: {alertToken: body.token},
    });
  } catch (error) {
    const err = error as Error;
    console.log("updateAlertToken", err.message);
  }
});
