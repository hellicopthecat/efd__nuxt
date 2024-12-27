//@ts-ignore
import {Prisma} from "@prisma/client";
//@ts-ignore
import jwt from "jsonwebtoken";
import prisma from "~/lib/prisma";
import {ACCESSTOKEN} from "~/utils/constants/constants";

async function getUser(uid: number) {
  const user = await prisma.user.findUnique({
    where: {id: Number(uid)},
    select: {
      id: true,
      uid: true,
      name: true,
      email: true,
      avatarUrl: true,
      address: {
        select: {
          sido: true,
          sigungu: true,
          bname: true,
          bname1: true,
          roadAddress: true,
          buildingNmae: true,
          restAddress: true,
          zonecode: true,
        },
      },
      sellItem: {
        select: {
          id: true,
          createdAt: true,
          itemName: true,
          itemPrice: true,
          itemImageUrl: true,
          complete: true,
        },
      },
      interestedItem: {
        select: {
          id: true,
          createdAt: true,
          itemName: true,
          itemPrice: true,
          itemImageUrl: true,
          complete: true,
        },
      },
    },
  });
  return user;
}

export type UserInfoType = Prisma.PromiseReturnType<typeof getUser>;

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  try {
    const accessToken = getCookie(event, ACCESSTOKEN);
    const uid = jwt.verify(accessToken + "", config.accessTokenKey) as {
      uid: string;
    };
    if (!uid) {
      throw createError("로그인을 하세요.");
    }
    const user = await getUser(Number(uid.uid));
    return user as UserInfoType;
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    throw createError("유저의 정보를 불러오는데 실패했습니다.");
  }
});
