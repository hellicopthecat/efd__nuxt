import prisma from "~/lib/prisma";
import {ACCESSTOKEN} from "~/utils/constants/constants";
import type {Message} from "firebase-admin/messaging";
import {initFirebaseServer} from "~/server/initFirebaseServer";
interface ICreateRoomType {
  itemId: string;
  itemName: string;
  sellerId: string;
  token: string;
}
export default defineEventHandler(async (event) => {
  const admin = initFirebaseServer();
  const config = useRuntimeConfig(event);
  const accessToken = getCookie(event, ACCESSTOKEN);
  const {itemId, itemName, sellerId, token} = getQuery<ICreateRoomType>(event);

  try {
    const verifiedToken = await unsealSession(
      event,
      {name: ACCESSTOKEN, password: config.ACCESS_TOKEN_KEY},
      accessToken + ""
    );

    // Exists Item ChatRoom
    const exsistRoom = await prisma.chatRoom.findFirst({
      where: {
        AND: [
          {User: {some: {id: Number(verifiedToken.data?.uid)}}},
          {User: {some: {id: Number(sellerId)}}},
        ],
        itemId: Number(itemId),
      },
    });
    if (exsistRoom) {
      return {
        ok: true,
        roomId: exsistRoom.id,
        errMsg: null,
      };
    } else {
      // Create Room
      const createRoom = await prisma.chatRoom.create({
        data: {
          User: {
            connect: [
              {id: Number(sellerId)},
              {id: Number(verifiedToken.data?.uid)},
            ],
          },
          Item: {connect: {id: Number(itemId)}},
        },
      });
      // Ready To Send Message
      const message = {
        notification: {
          title: `${itemName} 구매문의`,
          body: `${itemName} 구매문의가 있어요`,
        },
        webpush: {
          notification: {
            title: `${itemName} 구매문의`,
            body: `${itemName} 구매문의가 있어요`,
            icon: "./favicon.png",
          },
        },
        data: {
          title: `${itemName} 구매문의`,
          desc: `${itemName} 구매문의가 있어요`,
          roomId: createRoom.id,
          itemId,
        },
        token: token,
      } as Message;
      //Send Message
      const sendMessage = await admin.messaging().send(message);
      // Fail Send Message
      if (!sendMessage) {
        return {
          ok: false,
          roomId: null,
          errMsg: "해당유저가 로그인하지 않아 토큰이 갱신되지 않았습니다.",
        };
      }
      return {
        ok: true,
        roomId: createRoom.id,
        errMsg: null,
      };
    }
  } catch (error) {
    const err = error as Error;
    return {
      ok: false,
      roomId: null,
      errMsg: "채팅방 생성중 오류가 발생했습니다. 새로고침 후 다시 해보세요.",
    };
  }
});
