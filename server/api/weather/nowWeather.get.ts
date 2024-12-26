import {DDAY, NCST, TIME} from "~/utils/constants/weatherContants";
import {dfs_xy_conv} from "~/utils/weather/transLatLng";
const ncstTime = (time: number) => {
  if (time >= 2310 && time < 10) {
    return "2310";
  }
  const hour = Math.floor(time / 100) % 24;
  const minute = 10;
  return `${String(hour).padStart(2, "0")}${minute}`;
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
    const response = await $fetch(`${URL}${URL_TYPE}`);
    return response;
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
  }
});
