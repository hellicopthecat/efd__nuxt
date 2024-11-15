import type {IDisasterMsgResultType} from "~/types/disasterMsg/disasterMsgType";

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
  const url = `https://www.safetydata.go.kr/V2/api/DSSP-IF-00247?serviceKey=${config.disasterMsgAPIKEY}&crtDt=${year}${month}${day}`;
  const response = await $fetch<IDisasterMsgResultType>(url);
  return response.body.toSorted((a, b) => 1 - response.body.length);
});
