<script setup lang="ts">
import {initializeMap} from "~/utils/kakaomap";
import GoMyPosition from "./GoMyPosition.vue";
import LoadingIndicator from "../shared/LoadingIndicator.vue";

interface IKakaoMapProps {
  width: number | string;
  height: number | string;
}
defineProps<IKakaoMapProps>();

const loading = ref(true);

onMounted(() => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const {load} = await initializeMap(lat, lon, true);
    loading.value = load;
  });
});
</script>
<template>
  <div class="relative flex justify-center items-center w-full h-full">
    <LoadingIndicator v-if="loading" />
    <div class="relative">
      <div id="map" :style="`width:${width};height:${height}`"></div>
      <GoMyPosition v-if="!loading" />
    </div>
  </div>
</template>
