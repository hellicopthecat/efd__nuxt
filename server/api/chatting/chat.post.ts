import prisma from "~/lib/prisma";
import {ACCESSTOKEN} from "~/utils/constants/constants";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const accessToken = getCookie(event, ACCESSTOKEN);
  const {message, roomId} = (await readBody(event)) as {
    message: string;
    roomId: string;
  };

  try {
    const verifiedToken = await unsealSession(
      event,
      {name: ACCESSTOKEN, password: config.ACCESS_TOKEN_KEY},
      accessToken + ""
    );
    const chat = await prisma.chat.create({
      data: {
        chat: message,
        ChatRoom: {connect: {id: roomId}},
        user: {connect: {id: verifiedToken.data?.uid}},
      },
    });
    if (!chat) {
      return {
        ok: false,
        id: null,
        errMsg: "메세지 생성에 실패했습니다.",
      };
    }
    return {
      ok: true,
      id: chat.id,
      errMsg: null,
    };
  } catch (error) {
    return {
      ok: false,
      id: null,
      errMsg: "메세지 생성에 실패했습니다.",
    };
  }
});
