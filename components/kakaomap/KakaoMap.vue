<script setup lang="ts">
import {initializeMap} from "~/utils/kakaomap";
import GoMyPosition from "./GoMyPosition.vue";
import WeatherNow from "../home/WeatherNow.vue";

interface IKakaoMapProps {
  width: number | string;
  height: number | string;
}
defineProps<IKakaoMapProps>();

const initMap = useKakaoMap();

onMounted(() => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    await initializeMap(lat, lon, true);
  });
});
</script>
<template>
  <div class="flex justify-center items-center h-full">
    <h1 v-if="!initMap" class="text-red-500">LOADING</h1>

    <div class="relative">
      <WeatherNow v-if="initMap" />
      <div
        id="map"
        :style="`width:${width};height:${height}`"
        class="rounded-md"
      ></div>
      <GoMyPosition v-if="initMap" />
    </div>
  </div>
</template>
