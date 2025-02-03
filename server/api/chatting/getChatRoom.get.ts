import type {PromiseReturnType} from "@prisma/client/extension";
import prisma from "~/lib/prisma";
import {ACCESSTOKEN} from "~/utils/constants/constants";
const getChatRoom = async (roomId: string, userId: number) => {
  const existRoom = await prisma.chatRoom.findUnique({
    where: {id: roomId, User: {some: {id: userId}}},
    select: {id: true, User: true, chat: true},
  });
  return existRoom;
};
export type GetChatRoomType = PromiseReturnType<typeof getChatRoom>;
export default defineEventHandler(async (event) => {
  const query = getQuery(event) as {roomId: string};
  const config = useRuntimeConfig(event);
  const accessToken = getCookie(event, ACCESSTOKEN);
  try {
    const verifiedToken = await unsealSession(
      event,
      {name: ACCESSTOKEN, password: config.ACCESS_TOKEN_KEY},
      accessToken + ""
    );
    const existRoom = await getChatRoom(
      query.roomId,
      Number(verifiedToken.data?.uid)
    );
    if (!existRoom) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "존재하지 않는 채팅방입니다.",
      });
    }
    return existRoom;
  } catch (error) {
    const err = error as Error;
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: err.message || "대화방의 정보를 불러오는데 오류가 났습니다.",
    });
  }
});
