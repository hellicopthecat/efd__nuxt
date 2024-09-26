import {DDAY, TIME, VFCST, VFCSTTIME} from "~/utils/constants/weatherContants";
import {dfs_xy_conv} from "~/utils/weather/transLatLng";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const convertedCoord = dfs_xy_conv("toXY", Number(query.x), Number(query.y));
  const nx = convertedCoord.x;
  const ny = convertedCoord.y;

  const URL = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/${VFCST}?serviceKey=${config.publicAPIKEY}`;
  const URL_TYPE = `&numOfRows=1000&dataType=json&pageNo=1&base_date=${DDAY}&base_time=${VFCSTTIME(
    Number(TIME)
  )}&nx=${nx}&ny=${ny}`;

  const response = await $fetch(`${URL}${URL_TYPE}`);

  return response;
});
