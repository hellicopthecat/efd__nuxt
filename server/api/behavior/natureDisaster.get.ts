import {parseString} from "xml2js";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  if (!query.id) {
    return;
  }
  const url = `http://openapi.safekorea.go.kr/openapi/service/behaviorconductKnowHow/naturaldisaster/list?safety_cate=${query.id}&serviceKey=${config.publicAPIKEY}`;
  const response = await $fetch(url);
  parseString(response + "", async (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result.response.body[0].items[0].item);
    return result.response.body[0].items[0].item;
  });
});
