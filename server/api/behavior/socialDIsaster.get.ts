import type {IDefaultSafetyDataTypes} from "~/types/apiType";
import type {IBehaviorTypes} from "~/types/behavior/behaviorTypes";
import {PUBLIC_API_BASE_URL} from "~/utils/constants/constants";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const URL = `${PUBLIC_API_BASE_URL}/DSSP-IF-20589?serviceKey=${config.public.SOCIAL_DISASTER_KEY}&pageNo=1&numOfRows=100&safety_cate=${query.id}&returnType=json`;
  try {
    const response = await $fetch<IDefaultSafetyDataTypes<IBehaviorTypes>>(URL);
    return response.body;
  } catch (error) {
    const err = error as Error;
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "사회재난 행동요령 데이터를 불러오는데 오류가 발생했습니다.",
    });
  }
});
