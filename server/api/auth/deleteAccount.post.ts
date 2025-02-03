import {ACCESSTOKEN, REFRESHTOKEN} from "~/utils/constants/constants";
import {v2 as cloudinary} from "cloudinary";
import {configCloudinary} from "~/lib/cloudinary";
import prisma from "~/lib/prisma";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const refreshToken = await getSession(event, {
    name: REFRESHTOKEN,
    password: config.REFRESH_TOKEN_KEY,
  });
  try {
    const verifiedToken = await unsealSession(
      event,
      {name: REFRESHTOKEN, password: config.REFRESH_TOKEN_KEY},
      refreshToken + ""
    );
    if (verifiedToken) {
      configCloudinary();
      new Promise((resolve, reject) => {
        cloudinary.api.delete_resources_by_prefix(
          `${verifiedToken.data?.uid}`,
          {},
          (prefixError, prefixResult) => {
            if (prefixError) {
              reject(
                createError({
                  statusCode: 400,
                  statusMessage: "Bad Request",
                  message: "폴더내의 모든 사진들이 지워지지 않았습니다.",
                })
              );
            }
            cloudinary.api.delete_folder(
              `${verifiedToken.data?.uid}`,
              {},
              async (error, result) => {
                if (error) {
                  reject(
                    createError({
                      statusCode: 400,
                      statusMessage: "Bad Request",
                      message: "폴더 삭제에 실패했습니다.",
                    })
                  );
                }
                await prisma.$transaction(async (data) => {
                  const user = await data.user.findUnique({
                    where: {id: Number(verifiedToken.data?.uid)},
                  });
                  if (user) {
                    await data.user.delete({
                      where: {
                        id: user.id,
                      },
                    });
                    await prisma.userAddress.delete({
                      where: {id: user?.userAddressId},
                    });
                  }
                });

                resolve(result);
              }
            );
          }
        );
      });
      deleteCookie(event, ACCESSTOKEN);
      deleteCookie(event, REFRESHTOKEN);
      return {
        ok: true,
      };
    }
  } catch (error) {
    const err = error as Error;
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "계정삭제 중에 알수없는 오류가 났습니다. 다시 시도해주세요.",
    });
  }
});
