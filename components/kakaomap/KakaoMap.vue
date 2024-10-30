<script setup lang="ts">
import {initializeMap} from "~/utils/kakaomap";
import GoMyPosition from "./GoMyPosition.vue";
import LoadingIndicator from "../shared/LoadingIndicator.vue";

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
  <div class="flex justify-center items-center w-full h-full">
    <LoadingIndicator v-if="!initMap" />
    <div class="relative">
      <div id="map" :style="`width:${width};height:${height}`"></div>
      <GoMyPosition v-if="initMap" />
    </div>
  </div>
</template>
