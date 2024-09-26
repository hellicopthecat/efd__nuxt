import {
  FCST,
  forecastDate,
  forecastTime,
} from "~/utils/constants/weatherContants";
import {dfs_xy_conv} from "~/utils/weather/transLatLng";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const convertedCoord = dfs_xy_conv("toXY", Number(query.x), Number(query.y));
  const nx = convertedCoord.x;
  const ny = convertedCoord.y;
  const FORCASTDATE = forecastDate();
  const URL = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/${FCST}?serviceKey=${config.publicAPIKEY}`;
  const URL_TYPE = `&numOfRows=1000&dataType=json&pageNo=1&base_date=${FORCASTDATE}&base_time=${forecastTime}&nx=${nx}&ny=${ny}`;
  const response = await $fetch(`${URL}${URL_TYPE}`);

  return response;
});