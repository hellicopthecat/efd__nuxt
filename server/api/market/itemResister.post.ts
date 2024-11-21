import {mixed, object, string} from "yup";
import prisma from "~/lib/prisma";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import type {ITokenTypes} from "~/types/tokenType";

const itemResisterSchema = object({
  data: mixed()
    .required("파일이 누락되었습니다.")
    .test(
      "isValidSize",
      "Allowed Sized is 3MB",
      (value) => value && (value as File).size <= 300000
    ),
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
  const formData = await readMultipartFormData(event);
  const cookie = getCookie(event, "AccessToken");
  const decodeToken = jwt.decode(cookie + "") as ITokenTypes;

  try {
    // file upload
    const parseData = {
      data: formData?.find((field) => field.name === "data")?.data,
      itemData: JSON.parse(
        formData?.find((field) => field.name === "itemData")?.data.toString() ||
          "{}"
      ),
      address: JSON.parse(
        formData?.find((field) => field.name === "address")?.data?.toString() ||
          "{}"
      ),
    };

    const filename = formData?.find((field) => field.name === "data")?.filename;
    //test
    const saveFilePath = path.join(
      process.cwd(),
      "public/testImg",
      filename + ""
    );
    //schema validate
    const result = await itemResisterSchema.validate(parseData);
    if (result) {
      //test
      fs.writeFileSync(saveFilePath, parseData.data as Buffer);
      await prisma.item.create({
        data: {
          itemName: result.itemData.itemName,
          itemFileName: filename + "",
          itemPrice: result.itemData.itemPrice,
          itemImageUrl: filename + "",
          itemDesc: result.itemData.ItemDesc,
          itemSido: result.address.sido + "",
          itemSigungu: result.address.sigungu + "",
          itemRoadAdress: result.address.roadAddress + "",
          itemRestAdress: result.address.restAddress + "",
          seller: {connect: {id: Number(decodeToken?.id)}},
        },
      });
    }
    return {
      ok: true,
    };
  } catch (error) {
    const err = error as Error;
    throw createError(err.message);
  }
});
