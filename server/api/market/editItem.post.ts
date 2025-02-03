import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  try {
    const ok = await prisma.item.update({
      where: {id: Number(query.id)},
      data: {
        itemName: query.itemName + "",
        itemPrice: query.itemPrice + "",
        itemDesc: query.itemDesc + "",
      },
      select: {id: true},
    });
    if (!ok) {
      throw createError("아이템이 존재하지 않습니다.");
    }
    return {
      ok: true,
      id: ok.id,
      errMsg: undefined,
    };
  } catch (error) {
    const err = error as Error;
    throw createError(err.message);
  }
});
