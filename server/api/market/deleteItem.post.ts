import prisma from "~/lib/prisma";
import {v2 as cloudinary} from "cloudinary";
//@ts-ignore
import jwt from "jsonwebtoken";
import {ACCESSTOKEN} from "~/utils/constants/constants";
import {configCloudinary} from "~/lib/cloudinary";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  try {
    const accessToken = getCookie(event, ACCESSTOKEN);
    const verifiedToken = jwt.verify(
      accessToken + "",
      config.accessTokenKey
    ) as {uid: string};

    const ok = await prisma.item.delete({where: {id: Number(query.id)}});
    if (!ok) {
      throw createError("아이템이 존재하지 않습니다.");
    }
    configCloudinary();
    await cloudinary.uploader.destroy(
      `image/${verifiedToken.uid}/${ok.itemName}`
    );

    return {
      ok: true,
    };
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    throw createError("삭제하는 과정에서 에러가 발생했습니다.");
  }
});
