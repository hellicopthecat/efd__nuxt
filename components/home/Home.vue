<script setup lang="ts">
import GoMyPosition from "./GoMyPosition.vue";
import LoadingIndicator from "../shared/LoadingIndicator.vue";
import SafePlace from "./SafePlace.vue";
import {geolocationErrorUtil} from "~/utils/geolocations/locationUtil";
const initMap = useKakaoMap();
const {$initKakaoMap} = useNuxtApp();
const width = ref("100%");
const height = ref("100%");
const mapContID = ref("mapCont");

const resizeMap = (resizeWidth: number, resizeHeight: number) => {
  width.value = resizeWidth + "px";
  height.value = resizeHeight + "px";
  //@ts-ignore
  initMap.value.relayout();
};
let resizeHandler: (() => void) | null = null;
onMounted(() => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const {map} = await $initKakaoMap(lat, lon, true);
    initMap.value = map;
  }, geolocationErrorUtil);

  watchEffect(() => {
    const mapCont = document.getElementById(mapContID.value);
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const resizeWidth = entry.contentRect.width;
        const resizeHeight = entry.contentRect.height;
        if (entry.contentBoxSize) {
          width.value = resizeWidth + "px";
          height.value = resizeHeight + "px";
          resizeHandler = () => resizeMap(resizeWidth, resizeHeight);
          window.addEventListener("resize", () => resizeHandler);
        }
      }
    });
    if (mapCont) {
      resizeObserver.observe(mapCont);
    }
  });
});
onUnmounted(() => {
  if (resizeHandler) {
    window.removeEventListener("resize", resizeHandler);
    resizeHandler = null;
  }
});
</script>
<template>
  <div :id="mapContID" class="relative w-full h-full overflow-hidden text-em">
    <div v-if="!initMap" class="flex justify-center items-center w-full h-full">
      <LoadingIndicator class="size-32" />
    </div>
    <div class="relative">
      <SafePlace />
      <div id="map" :style="`width:${width};height:${height}`"></div>
      <GoMyPosition />
    </div>
  </div>
</template>
