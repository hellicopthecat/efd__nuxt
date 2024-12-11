import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  try {
    const ok = await prisma.item.delete({where: {id: Number(query.id)}});
    if (!ok) {
      throw createError("아이템이 존재하지 않습니다.");
    }
    return {
      ok: true,
    };
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    throw createError("삭제하는 과정에서 에러가 발생했습니다.");
  }
});
