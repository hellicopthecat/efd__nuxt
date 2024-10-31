import {parseString} from "xml2js";
import type {
  IBehaviorTypes,
  IDefaultBehaviorTypes,
} from "~/types/behavior/behaviorTypes";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const url = `http://openapi.safekorea.go.kr/openapi/service/behaviorconduct/lifesafety/list?safety_cate=${query.id}&serviceKey=${config.publicAPIKEY}`;
  const data = [] as IBehaviorTypes[];
  const response = await $fetch(url);
  parseString(response + "", async (err, result: IDefaultBehaviorTypes) => {
    if (err) {
      console.log(err);
    }
    data.push(...result.response.body[0].items[0].item);
  });
  return data;
});
