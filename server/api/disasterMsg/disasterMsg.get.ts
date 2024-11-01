import type {IDisasterMsgResultType} from "~/types/disasterMsg/disasterMsgType";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const url = `https://www.safetydata.go.kr/V2/api/DSSP-IF-00247?serviceKey=${
    config.disasterMsgAPIKEY
  }&crtDt=${20241031}`;
  const response = await $fetch<IDisasterMsgResultType>(url);
  return response.body.toSorted((a, b) => 1 - response.body.length);
});
