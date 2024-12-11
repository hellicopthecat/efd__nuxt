<script setup lang="ts">
import type {IDefaultApiResponse} from "~/types/apiType";
import type {IWeatherNowTypes} from "~/types/weather/weatherTypes";
import Precipitation from "../weatherComp/Precipitation.vue";
import RainfallProbability from "../weatherComp/RainfallProbability.vue";
import WindDirection from "../weatherComp/WindDirection.vue";
import WindPower from "../weatherComp/WindPower.vue";
import LoadingIndicator from "../shared/LoadingIndicator.vue";

const weatherNow = ref<IDefaultApiResponse | null>(null);
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
  const data = await $fetch<IDefaultApiResponse>("/api/weather/nowWeather", {
    params: {x: lat, y: lng},
  });
  weatherNow.value = data;

  (data.response.body.items.item as IWeatherNowTypes[]).map(
    (weather: IWeatherNowTypes) => {
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
    }
  );
};
const handleRotate = () => (rotate.value = !rotate.value);

onMounted(() => {
  navigator.geolocation.getCurrentPosition(({coords}) => {
    getWeatherNow(coords.latitude, coords.longitude);
  });
});
</script>

<template>
  <div class="text-white *:transition-all *:ease-in-out *:duration-200 w-full">
    <div v-if="!(weatherNow && weatherNow.response.body.items.item)">
      <LoadingIndicator />
    </div>

    <div
      v-if="weatherNow && weatherNow.response.body.items.item"
      class="flex flex-col gap-2 *:transition-all *:ease-in-out *:duration-200"
    >
      <NuxtLink to="/weather" class="self-end">
        <SharedText tag="h5" txt="날씨보러가기" />
      </NuxtLink>

      <div class="flex justify-around items-center">
        <!-- 현재날씨 및 온도 -->
        <Precipitation
          :weatherType="Number(precipitation)"
          className="size-10"
        />
        <SharedText tag="h2" :txt="`${temperature} &#8451;`" />
      </div>

      <div
        class="origin-top"
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
        class="size-10 self-center"
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
