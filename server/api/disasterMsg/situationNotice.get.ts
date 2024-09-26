import type {ISituationTypes} from "~/types/situationType";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const response = await $fetch<ISituationTypes>(
    `http://apis.data.go.kr/1741000/MisfortuneSituationNoticeMsg3/getMisfortuneSituationNoticeMsg1List?serviceKey=${config.publicAPIKEY}&pageNo=1&numOfRows=10&type=json`,
    {
      parseResponse: JSON.parse,
    }
  );

  return response;
});
