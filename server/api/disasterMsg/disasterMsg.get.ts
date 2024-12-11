import type {IDefaultSafetyDataTypes} from "~/types/apiType";
import type {IDisasterMsgType} from "~/types/disasterMsg/disasterMsgType";
import {PUBLIC_API_BASE_URL} from "~/utils/constants/constants";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const today = new Date();
  today.setDate(today.getDate() - 1);
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day =
    String(today.getDate()).padStart(2, "0") === "0"
      ? "01"
      : String(today.getDate()).padStart(2, "0");
  const url = `${PUBLIC_API_BASE_URL}/DSSP-IF-00247?serviceKey=${config.disasterMsgAPIKEY}&crtDt=${year}${month}${day}`;
  try {
    const response = await $fetch<IDefaultSafetyDataTypes<IDisasterMsgType>>(
      url
    );
    return response.body.toSorted((a, b) => 1 - response.body.length);
  } catch (error) {
    const err = error as Error;
    console.log("DisasterMsg : ", err.message);
  }
});
