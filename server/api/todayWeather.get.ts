import {DDAY, NCST, TIME} from "~/utils/constants/weatherContants";
import {dfs_xy_conv} from "~/utils/weather/transLatLng";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const convertedCoodrd = dfs_xy_conv("toXY", Number(query.x), Number(query.y));
  const nx = convertedCoodrd.x;
  const ny = convertedCoodrd.y;
  const URL = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/${NCST}?serviceKey=${config.publicAPIKEY}`;
  const URL_TYPE = `&numOfRows=1000&dataType=json&pageNo=1&base_date=${DDAY}&base_time=${TIME}&nx=${nx}&ny=${ny}`;
  const response = await $fetch(`${URL}${URL_TYPE}`);

  return response;
});
