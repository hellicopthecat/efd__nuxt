import type {IDefaultApiResponse} from "~/types/apiType";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  try {
    const response = await $fetch(
      `https://www.safetydata.go.kr/V2/api/DSSP-IF-10941?serviceKey=${
        config.public.SAFEAREA_KEY
      }&returnType=json&pageNo=1&numOfRows=50&startLat=${String(
        Number(query.lat) - 0.01
      )}&endLat=${String(Number(query.lat) + 0.01)}&startLot=${String(
        Number(query.lon) - 0.01
      )}&endLot=${String(Number(query.lon) + 0.01)}`
    );
    //@ts-ignore
    return response.body;
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
  }
});
