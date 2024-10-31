import {parseString} from "xml2js";
import type {
  IBehaviorTypes,
  IDefaultBehaviorTypes,
} from "~/types/behavior/behaviorTypes";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const url = `http://openapi.safekorea.go.kr/openapi/service/behaviorconduct/disaster/civildefence/total/list?safety_cate=${query.id}&serviceKey=${config.publicAPIKEY}`;
  const response = await $fetch(url);
  const data = [] as IBehaviorTypes[];
  parseString(response + "", (err, result: IDefaultBehaviorTypes) => {
    if (err) {
      console.log(err);
    }
    return data.push(...result.response.body[0].items[0].item);
  });
  return data;
});
