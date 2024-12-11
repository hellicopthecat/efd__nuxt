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

const isLoading = ref(false);
const todayWeathers = ref<INewForeCastType[]>([]);
const tomorrowWeathers = ref<INewForeCastType[]>([]);
const theDayAfterWeathers = ref<INewForeCastType[]>([]);

const getTomorrwWeater = async (lat: number, lng: number) => {
  isLoading.value = true;
  const data = await $fetch<IDefaultApiResponse>(
    "/api/weather/tomorrowWeather",
    {
      query: {x: lat, y: lng},
    }
  );

  const todayData = (
    data.response.body.items.item as IWeatherTodayTomorrowTypes[]
  ).filter((data) => data.fcstDate === `${year}${month}${date}`);
  const tomorrowData = (
    data.response.body.items.item as IWeatherTodayTomorrowTypes[]
  ).filter(
    (data) => data.fcstDate === `${VFCSTYEAR}${VFCSTMONTH}${tomorrowDate}`
  );
  const theDayAfterData = (
    data.response.body.items.item as IWeatherTodayTomorrowTypes[]
  ).filter(
    (data) => data.fcstDate === `${VFCSTYEAR}${VFCSTMONTH}${dayAfterDate}`
  );

  createNewArr({data: todayData, newWeatherData: todayWeathers});
  createNewArr({data: tomorrowData, newWeatherData: tomorrowWeathers});
  createNewArr({data: theDayAfterData, newWeatherData: theDayAfterWeathers});

  isLoading.value = false;
};

onMounted(() => {
  navigator.geolocation.getCurrentPosition(({coords}) => {
    getTomorrwWeater(coords.latitude, coords.longitude);
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
            class="flex flex-col min-w-[300px] bg-slate-700 p-5 rounded-md gap-2"
          >
            <ForcastInfo :data="weather" />
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
