import type {IDefaultSafetyDataTypes} from "~/types/apiType";
import type {IWeatherSpecialNoticeType} from "~/types/weather/weatherTypes";
import {PUBLIC_API_BASE_URL} from "~/utils/constants/constants";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  try {
    const response = await $fetch<
      IDefaultSafetyDataTypes<IWeatherSpecialNoticeType>
    >(
      `${PUBLIC_API_BASE_URL}/DSSP-IF-00045?serviceKey=${config.weatherSpecialNotiKEY}&pageNo=${query.pageNo}&numOfRows=10&returnType=json`
    );
    return response;
  } catch (error) {
    const err = error as Error;
    console.log("Weatherspecial : ", err.message);
  }
});