import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery<{id: string}>(event);

  try {
    const item = await prisma.item.findUnique({
      where: {id: Number(query.id)},
      include: {seller: true, interested: true},
    });
    if (!item) {
      throw createError("물품이 없습니다.");
    }
    return item;
  } catch (error) {
    const err = error as Error;
    throw createError(err.message);
  }
});
