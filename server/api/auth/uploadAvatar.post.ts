import {v2 as cloudinary} from "cloudinary";
import type {UploadApiOptions} from "cloudinary";
import {configCloudinary} from "~/lib/cloudinary";
import {ACCESSTOKEN} from "~/utils/constants/constants";
import {mixed} from "yup";
import type {FileObject} from "~/types/fileObject";
import prisma from "~/lib/prisma";

const uploadAvatarSchema = mixed()
  .required("파일이 없습니다.")
  .test("validate", "3MB 이하의 파일만 가능합니다.", (value) => {
    const {data} = value as FileObject;
    return data.length <= 300000;
  });
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const accessToken = getCookie(event, ACCESSTOKEN);
  const readFormData = await readMultipartFormData(event);
  const fileData = readFormData?.find((value) => value.name === "data");
  try {
    let url = "";
    //Verified TOKEN
    const verifiedToken = await unsealSession(
      event,
      {name: ACCESSTOKEN, password: config.ACCESS_TOKEN_KEY},
      accessToken + ""
    );

    const result = (await uploadAvatarSchema.validate(fileData)) as FileObject;
    if (result) {
      const buffer = new Uint8Array(result.data);
      // //cloudinary
      configCloudinary();
      const uploadOption = {
        folder: `${verifiedToken.data?.id}/avatar`,
        public_id: "avatar",
        use_filename: true,
        unique_filename: true,
        overwrite: true,
      } as UploadApiOptions;
      new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(uploadOption, async (error, result) => {
            if (error) {
              reject(error.message);
              return;
            }
            await prisma.user.update({
              where: {id: Number(verifiedToken.data?.id)},
              data: {avatarUrl: result?.url},
            });
            resolve(result);
            url = result?.url + "";
          })
          .end(buffer);
      });
    }
    return {
      url,
    };
  } catch (error) {
    const err = error as Error;
  }
});
