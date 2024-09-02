<script setup lang="ts">
import {initializeMap, makeMarker} from "~/utils/kakaomap";
import GoMyPosition from "./GoMyPosition.vue";
import WeatherNow from "../home/WeatherNow.vue";

interface IKakaoMapProps {
  width: number | string;
  height: number | string;
}
defineProps<IKakaoMapProps>();

const initMap = useKakaoMap();

onMounted(() => {
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    initializeMap(lat, lon, true);
  });
});
</script>
<template>
  <div v-if="!initMap" class="flex justify-center items-center h-full">
    <h1 class="text-red-500">LOADING</h1>
  </div>
  <WeatherNow />
  <div class="relative">
    <div
      id="map"
      :style="`width:${width};height:${height}`"
      class="rounded-md"
    ></div>
    <GoMyPosition v-if="initMap" />
  </div>
</template>
