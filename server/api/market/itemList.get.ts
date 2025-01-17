import {ACCESSTOKEN} from "~/utils/constants/constants";
import prisma from "~/lib/prisma";
import {Prisma} from "@prisma/client";
//@ts-ignore
import jwt from "jsonwebtoken";
async function getItems({
  sido,
  sigungu,
  takes,
}: {
  sido: string;
  sigungu: string;
  takes: number;
}) {
  const items = await prisma.item.findMany({
    where: {
      AND: [{itemSido: sido}, {itemSigungu: sigungu}],
    },
    include: {seller: true},
    take: takes + 1,
    skip: 0,
    orderBy: {createdAt: "desc"},
  });
  return items;
}

export type GetItemsTypes = Prisma.PromiseReturnType<typeof getItems>;

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const config = useRuntimeConfig();

  try {
    const accessToken = getCookie(event, ACCESSTOKEN);

    const verifyToken = jwt.verify(accessToken + "", config.accessTokenKey) as {
      uid: string;
    };

    const existUser = await prisma.user.findUnique({
      where: {id: Number(verifyToken.uid + "")},
      select: {address: {select: {sido: true, sigungu: true}}},
    });
    if (existUser) {
      const items: GetItemsTypes = await getItems({
        sido: existUser.address.sido,
        sigungu: existUser.address.sigungu,
        takes: Number(query.page),
      });
      return items;
    }
  } catch (error) {
    const err = error as Error;
    console.log("Item List Error ::", err.message);
  }
});
