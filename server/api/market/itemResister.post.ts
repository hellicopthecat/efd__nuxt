import {mixed, object, string} from "yup";
import prisma from "~/lib/prisma";
import {ACCESSTOKEN} from "~/utils/constants/constants";
//@ts-ignore
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from "cloudinary";
import type {UploadApiOptions} from "cloudinary";
import {configCloudinary} from "~/lib/cloudinary";

interface FileObject {
  data: Buffer;
  name?: string;
  filename?: string;
  type?: string;
}
const itemResisterSchema = object({
  data: mixed()
    .required("파일이 누락되었습니다.")
    .test(
      "isValidSize",
      "3MB 이하의 파일이여만합니다. (Yup :: Allowed Sized is 3MB)",
      (value) => {
        const {data} = value as FileObject;
        return data.length <= 300000;
      }
    )
    .test("isValidType", "JPG, PNG, GIF 만 가능합니다.", (value) => {
      const {type} = value as FileObject;
      const validType: {[key: string]: boolean} = {
        "image/jpg": true,
        "image/jpeg": true,
        "image/png": true,
        "image/gif": true,
      };
      if (type) {
        return validType[type];
      }
    }),
  itemData: object({
    itemName: string().required("물품 이름을 작성해주세요."),
    itemPrice: string().required("물품 가격을 작성해주세요."),
    ItemDesc: string().required("물품 설명을 작성해주세요."),
  }),
  address: object({
    sido: string(),
    sigungu: string(),
    bname: string(),
    bname1: string(),
    roadAddress: string(),
    buildingName: string(),
    zonecode: string(),
    restAddress: string(),
  }),
});

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const readFormData = await readMultipartFormData(event);
  try {
    //token
    const accessToken = getCookie(event, ACCESSTOKEN);
    const verifiyAccessToken = jwt.verify(
      accessToken + "",
      config.accessTokenKey
    ) as {uid: string};
    if (!verifiyAccessToken.uid) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "토큰이 만료되었습니다. 새로고침해주세요",
      });
    }

    // file upload
    const parseData = {
      data: readFormData?.find((field) => field.name === "data"),
      itemData: JSON.parse(
        readFormData
          ?.find((field) => field.name === "itemData")
          ?.data.toString() || "{}"
      ),
      address: JSON.parse(
        readFormData
          ?.find((field) => field.name === "address")
          ?.data?.toString() || "{}"
      ),
    };

    //schema validate
    const validateResult = await itemResisterSchema.validate(parseData);
    if (!validateResult) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "모든 사항을 기재해 주세요",
      });
    }
    // after validate
    if (validateResult) {
      const fileData = validateResult.data as FileObject;
      const file = fileData.data;
      const filename = validateResult.itemData.itemName;
      const buffer = new Uint8Array(file);

      // // cloudinary
      configCloudinary();
      const uploadOption = {
        folder: `${verifiyAccessToken.uid}/items`,
        public_id: filename,
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      } as UploadApiOptions;
      //upload
      await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(uploadOption, async (error, result) => {
            if (error) {
              console.log(error.message);
              reject(error.message);
              return;
            }
            resolve(result);
            await prisma.item.create({
              data: {
                itemName: validateResult.itemData.itemName,
                itemFileName: filename + "",
                itemPrice: validateResult.itemData.itemPrice,
                itemImageUrl: result?.secure_url + "",
                itemDesc: validateResult.itemData.ItemDesc,
                itemSido: validateResult.address.sido + "",
                itemSigungu: validateResult.address.sigungu + "",
                itemRoadAdress: validateResult.address.roadAddress + "",
                itemRestAdress: validateResult.address.restAddress + "",
                seller: {connect: {id: Number(verifiyAccessToken.uid)}},
              },
            });
          })
          .end(buffer);
      });
    }
    return {
      ok: true,
    };
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message:
        err.message ||
        "파일 업로드 중 에러가 발생되었습니다. 관리자에게 연락하세요.",
    });
  }
});
