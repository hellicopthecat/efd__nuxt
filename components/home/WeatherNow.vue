<script setup lang="ts">
import type {IDefaultApiResponse} from "~/types/apiType";
import Precipitation from "../weatherComp/Precipitation.vue";
import RainfallProbability from "../weatherComp/RainfallProbability.vue";
import WindDirection from "../weatherComp/WindDirection.vue";
import WindPower from "../weatherComp/WindPower.vue";

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

const getWeatherNow = async (lat: number, lng: number) => {
  const data = await $fetch<IDefaultApiResponse>("/api/todayWeather", {
    params: {x: lat, y: lng},
  });
  weatherNow.value = data;
  data.response.body.items.item.map((weather) => {
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
  console.log(data);
};
onMounted(() => {
  navigator.geolocation.getCurrentPosition(({coords}) => {
    getWeatherNow(coords.latitude, coords.longitude);
  });
});
</script>

<template>
  <div
    v-if="weatherNow && weatherNow.response.body.items.item"
    class="absolute top-10 left-10 z-50 rounded-md p-5 text-white overflow-hidden"
  >
    <div class="absolute bg-black w-full h-full left-0 top-0 opacity-65" />
    <div class="relative z-50">
      <div class="flex">
        <!-- 현재날씨 및 온도 -->
        <Precipitation :weatherType="Number(precipitation)" />
        <SharedText tag="h3" :txt="`${temperature} &#8451;`" />
      </div>
      <div class="flex items-center">
        <!-- 습도 -->
        <Icon name="wi:humidity" class="size-12" />
        <SharedText tag="h3" :txt="`${humidity} %`" />
      </div>
      <div class="flex items-center">
        <!-- 강수확률 -->
        <Icon name="wi:raindrops" class="size-12" />
        <RainfallProbability :probability="Number(raindropsProbability)" />
      </div>

      <div class="flex items-center">
        <!-- 풍향 -->
        <Icon name="wi:small-craft-advisory" class="size-12" />
        <WindDirection :angle="Number(windDirection)" />
      </div>
      <div class="flex items-center">
        <!-- 풍속 -->
        <Icon name="wi:strong-wind" class="size-12" />
        <WindPower :power="Number(windPower)" />
      </div>
    </div>
  </div>
</template>
