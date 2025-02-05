<script setup lang="ts">
import LoadingIndicator from "~/components/shared/LoadingIndicator.vue";
import type {IDefaultApiResponse} from "~/types/apiType";
import type {
  INewForeCastType,
  IWeatherTodayTomorrowTypes,
} from "~/types/weather/weatherTypes";
import {
  date,
  dayAfterDate,
  month,
  tomorrowDate,
  VFCSTMONTH,
  VFCSTYEAR,
  year,
} from "~/utils/constants/weatherContants";
import {createNewArr} from "~/utils/weather/createNewWeatherArr";
import ForcastInfo from "./ForcastInfo.vue";

const {lat, lng} = defineProps({lat: Number, lng: Number});

const isLoading = ref(false);
const errMsg = ref("");
const todayWeathers = ref<INewForeCastType[]>([]);
const tomorrowWeathers = ref<INewForeCastType[]>([]);
const theDayAfterWeathers = ref<INewForeCastType[]>([]);

const getTomorrwWeater = async (lat: number, lng: number) => {
  const {data, error, status} = await useFetch<IDefaultApiResponse>(
    "/api/weather/tomorrowWeather",
    {
      query: {x: lat, y: lng},
    }
  );
  if (data.value) {
    const todayData = (
      data.value.response.body.items.item as IWeatherTodayTomorrowTypes[]
    ).filter((data) => data.fcstDate === `${year}${month}${date}`);
    const tomorrowData = (
      data.value.response.body.items.item as IWeatherTodayTomorrowTypes[]
    ).filter(
      (data) => data.fcstDate === `${VFCSTYEAR}${VFCSTMONTH}${tomorrowDate}`
    );
    const theDayAfterData = (
      data.value.response.body.items.item as IWeatherTodayTomorrowTypes[]
    ).filter(
      (data) => data.fcstDate === `${VFCSTYEAR}${VFCSTMONTH}${dayAfterDate}`
    );
    createNewArr({data: todayData, newWeatherData: todayWeathers});
    createNewArr({data: tomorrowData, newWeatherData: tomorrowWeathers});
    createNewArr({data: theDayAfterData, newWeatherData: theDayAfterWeathers});
  }
  if (error.value) {
    const err = error.value.data as Error;
    errMsg.value = err.message;
  }
  if (status.value === "pending") {
    isLoading.value = true;
  } else {
    isLoading.value = false;
  }
};

onMounted(async () => {
  watchEffect(async () => {
    await getTomorrwWeater(Number(lat), Number(lng));
  });
});
</script>
<template>
  <section class="text-white">
    <LoadingIndicator v-if="isLoading" />
    <div v-else class="flex flex-col gap-10 overflow-hidden">
      <article class="flex flex-col gap-5 w-full overflow-hidden">
        <SharedText tag="h2" txt="오늘날씨" />
        <div class="flex overflow-x-auto gap-10 py-10">
          <div
            v-for="weather in todayWeathers"
            :key="weather.TMP"
            class="flex flex-col min-w-[300px] bg-slate-700 p-5 rounded-md gap-2"
          >
            <ForcastInfo :data="weather" />
          </div>
        </div>
      </article>

      <article class="flex flex-col gap-5 w-full overflow-hidden">
        <SharedText tag="h2" txt="내일날씨" />
        <div class="flex overflow-x-auto gap-10 py-10">
          <div
            v-for="weather in tomorrowWeathers"
            :key="weather.TMP"
            class="flex flex-col min-w-[300px] bg-slate-700 p-5 rounded-md gap-2"
          >
            <ForcastInfo :data="weather" />
          </div>
        </div>
      </article>

      <article class="flex flex-col gap-5 w-full overflow-hidden">
        <SharedText tag="h2" txt="모래날씨" />
        <div class="flex overflow-x-auto gap-10 py-10">
          <div
            v-for="weather in theDayAfterWeathers"
            :key="weather.TMP"
            class="flex flex-col min-w-[300px] bg-slate-700 p-5 rounded-md gap-2"
          >
            <ForcastInfo :data="weather" />
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
