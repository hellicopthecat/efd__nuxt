import prisma from "~/lib/prisma";
import {v2 as cloudinary} from "cloudinary";
import {ACCESSTOKEN} from "~/utils/constants/constants";
import {configCloudinary} from "~/lib/cloudinary";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const query = getQuery(event);
  const accessToken = getCookie(event, ACCESSTOKEN);
  try {
    const verifiedToken = await unsealSession(
      event,
      {name: ACCESSTOKEN, password: config.ACCESS_TOKEN_KEY},
      accessToken + ""
    );

    const ok = await prisma.item.delete({
      where: {id: Number(query.id)},
    });
    if (!ok) {
      throw createError("아이템이 존재하지 않습니다.");
    }
    configCloudinary();
    await cloudinary.uploader.destroy(
      `${verifiedToken.data?.uid}/items/${ok.itemName}`
    );

    return {
      ok: true,
      errMsg: null,
    };
  } catch (error) {
    const err = error as Error;
    return {
      ok: false,
      errMsg: createError("삭제하는 과정에서 에러가 발생했습니다."),
    };
  }
});
