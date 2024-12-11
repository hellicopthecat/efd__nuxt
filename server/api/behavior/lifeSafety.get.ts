import type {IDefaultSafetyDataTypes} from "~/types/apiType";
import type {IBehaviorTypes} from "~/types/behavior/behaviorTypes";
import {PUBLIC_API_BASE_URL} from "~/utils/constants/constants";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const URL = `${PUBLIC_API_BASE_URL}/DSSP-IF-20590?serviceKey=${config.lifesafetyDisasterKEY}&pageNo=1&numOfRows=100&safety_cate=${query.id}&returnType=json`;
  const response = await $fetch<IDefaultSafetyDataTypes<IBehaviorTypes>>(URL);
  return response.body;
});
