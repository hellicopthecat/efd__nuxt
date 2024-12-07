import {ACCESSTOKEN} from "~/utils/constants/constants";
import jwt from "jsonwebtoken";
import type {ITokenTypes} from "~/types/tokenType";
import prisma from "~/lib/prisma";
import {Prisma} from "@prisma/client";
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
    orderBy: {createAt: "desc"},
  });
  return items;
}
export type GetItemsTypes = Prisma.PromiseReturnType<typeof getItems>;
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const cookie = getCookie(event, ACCESSTOKEN);
  const config = useRuntimeConfig();
  let data = [] as GetItemsTypes | [];

  try {
    const verifyToken = jwt.verify(
      cookie + "",
      config.cookieKEY
    ) as ITokenTypes;
    const existUser = await prisma.user.findUnique({
      where: {id: verifyToken.id},
      select: {address: {select: {sido: true, sigungu: true}}},
    });
    if (existUser) {
      const items: GetItemsTypes = await getItems({
        sido: existUser.address.sido,
        sigungu: existUser.address.sigungu,
        takes: Number(query.page),
      });

      return (data = items);
    }
    return {
      data,
    };
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
  }
});
