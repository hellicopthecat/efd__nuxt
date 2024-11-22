import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  try {
    await prisma.item.update({
      where: {id: Number(query.itemID)},
      data: {
        interested: {connect: {id: Number(query.uid)}},
      },
    });
    return {
      interest: true,
    };
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    throw createError("서버에 반영되지 않았습니다.");
  }
});
