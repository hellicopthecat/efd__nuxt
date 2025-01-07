<script setup lang="ts">
import type {IWeatherNowTypes} from "~/types/weather/weatherTypes";
import Precipitation from "../weatherComp/Precipitation.vue";
import RainfallProbability from "../weatherComp/RainfallProbability.vue";
import WindDirection from "../weatherComp/WindDirection.vue";
import WindPower from "../weatherComp/WindPower.vue";
import LoadingIndicator from "../shared/LoadingIndicator.vue";
import SharedText from "../shared/SharedText.vue";
import {geolocationErrorUtil} from "~/utils/geolocations/locationUtil";

const {open} = defineProps({open: Boolean});

const weatherNow = ref<IWeatherNowTypes[] | null>(null);
const errMsg = ref("");
//현재 날씨
const precipitation = ref<number | null>(null);
//현재 온도
const temperature = ref<number | null>(null);
//현재 습도
const humidity = ref<number | null>(null);
//강수 확률
const raindropsProbability = ref<number | null>(null);
//풍향
const windDirection = ref<number | null>(null);
//풍속
const windPower = ref<number | null>(null);

const rotate = ref(false);

const getWeatherNow = async (lat: number, lng: number) => {
  const {data, error} = await useFetch<IWeatherNowTypes[]>(
    "/api/weather/nowWeather",
    {
      method: "GET",
      params: {x: lat, y: lng},
    }
  );

  if (data.value) {
    weatherNow.value = data.value;
    (data.value as IWeatherNowTypes[]).map((weather: IWeatherNowTypes) => {
      if (weather.category === "PTY") {
        precipitation.value = Number(weather.obsrValue);
      }
      if (weather.category === "T1H") {
        temperature.value = Number(weather.obsrValue);
      }
      if (weather.category === "REH") {
        humidity.value = Number(weather.obsrValue);
      }
      if (weather.category === "VEC") {
        windDirection.value = Number(weather.obsrValue);
      }
      if (weather.category === "WSD") {
        windPower.value = Number(weather.obsrValue);
      }
    });
  }
  if (error.value) {
    const err = error.value.data as Error;
    errMsg.value = err.message;
  }
};
const handleRotate = () => (rotate.value = !rotate.value);

onMounted(() => {
  navigator.geolocation.getCurrentPosition(async ({coords}) => {
    await getWeatherNow(coords.latitude, coords.longitude);
  }, geolocationErrorUtil);
});
</script>

<template>
  <div
    class="text-white *:transition-all *:ease-in-out *:duration-200 w-full transition-all duration-300 ease-in-out origin-top"
    :class="open ? 'scale-0 h-0' : 'scale-100'"
  >
    <div v-if="!weatherNow">
      <LoadingIndicator />
    </div>
    <div v-if="errMsg" class="*:text-red-400 *:font-semibold">
      <SharedText tag="h5" :txt="errMsg" />
    </div>
    <div
      v-if="weatherNow"
      class="flex xl:flex-col gap-2 *:transition-all *:ease-in-out *:duration-200"
    >
      <NuxtLink to="/weather" class="hidden xl:block xl:self-end">
        <SharedText tag="h5" txt="날씨보러가기" />
      </NuxtLink>

      <div class="flex items-center gap-5 xl:gap-0 xl:justify-around w-full">
        <!-- 현재날씨 및 온도 -->
        <Precipitation
          :weatherType="Number(precipitation)"
          className="size-10"
        />
        <SharedText tag="h2" :txt="`${temperature} &#8451;`" />
      </div>

      <div
        class="origin-top hidden xl:block"
        :class="rotate ? 'scale-y-100 h-full' : 'scale-y-0 h-0'"
      >
        <div class="flex items-center gap-5">
          <!-- 습도 -->
          <Icon name="wi:humidity" class="size-8" />
          <SharedText tag="h4" :txt="`${humidity} %`" />
        </div>
        <div class="flex items-center gap-5">
          <!-- 강수확률 -->
          <Icon name="wi:raindrops" class="size-8" />
          <RainfallProbability
            tag="h4"
            :probability="Number(raindropsProbability)"
          />
        </div>

        <div class="flex items-center gap-5">
          <!-- 풍향 -->
          <Icon name="wi:small-craft-advisory" class="size-8" />
          <WindDirection tag="h4" :angle="Number(windDirection)" />
        </div>
        <div class="flex items-center gap-5">
          <!-- 풍속 -->
          <Icon name="wi:strong-wind" class="size-8" />
          <WindPower :power="Number(windPower)" />
        </div>
      </div>

      <button
        @click="handleRotate"
        class="size-10 self-center hidden xl:block"
        :class="rotate ? '-rotate-180' : 'rotate-0'"
      >
        <Icon
          name="heroicons:chevron-double-down-16-solid"
          class="size-7 hover:animate-bounce"
        />
      </button>
    </div>
  </div>
</template>
