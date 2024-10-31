import {parseString} from "xml2js";
import type {
  IBehaviorTypes,
  IDefaultBehaviorTypes,
} from "~/types/behavior/behaviorTypes";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  if (!query.id) {
    return;
  }
  const url = `http://openapi.safekorea.go.kr/openapi/service/behaviorconductKnowHow/naturaldisaster/list?safety_cate=${query.id}&serviceKey=${config.publicAPIKEY}`;
  const response = await $fetch(url);
  const data = [] as IBehaviorTypes[];
  parseString(response + "", async (err, result: IDefaultBehaviorTypes) => {
    if (err) {
      console.log(err);
    }
    data.push(...result.response.body[0].items[0].item);
  });

  return data;
});
