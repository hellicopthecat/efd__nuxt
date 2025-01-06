import type {IDefaultApiResponse} from "~/types/apiType";
import {DDAY, NCST, TIME} from "~/utils/constants/weatherContants";
import {dfs_xy_conv} from "~/utils/weather/transLatLng";

const ncstTime = (time: number) => {
  if (time >= 2310 && time < 10) {
    return "2310";
  }
  const hour = Math.floor(time / 100) % 24;
  const minute = 10;
  const calcul = `${String(hour).padStart(2, "0")}${minute}`;
  const minuscal = `${String(hour - 1).padStart(2, "0")}${minute}`;
  return Number(calcul) > time ? minuscal : calcul;
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const convertedCoored = dfs_xy_conv("toXY", Number(query.x), Number(query.y));
  const nx = convertedCoored.x;
  const ny = convertedCoored.y;
  const URL = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/${NCST}?serviceKey=${config.publicAPIKEY}`;
  const URL_TYPE = `&numOfRows=1000&dataType=json&pageNo=1&base_date=${DDAY}&base_time=${ncstTime(
    Number(TIME)
  )}&nx=${nx}&ny=${ny}`;
  try {
    const response = await $fetch<IDefaultApiResponse>(`${URL}${URL_TYPE}`);
    return response.response.body.items.item;
  } catch (error) {
    const err = error as Error;
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "날씨를 불러오는데 오류가 발생되었습니다.",
    });
  }
});
