import prisma from "~/lib/prisma";
import {ACCESSTOKEN} from "~/utils/constants/constants";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const accessToken = getCookie(event, ACCESSTOKEN);
  try {
    const verifiedToken = await unsealSession(
      event,
      {name: ACCESSTOKEN, password: config.ACCESS_TOKEN_KEY},
      accessToken + ""
    );
    const rooms = await prisma.chatRoom.findMany({
      where: {User: {some: {id: verifiedToken.data?.uid}}},
      include: {Item: true, chat: true},
    });
    return rooms;
  } catch (error) {
    const err = error as Error;
  }
});
