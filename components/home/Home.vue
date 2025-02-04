<script setup lang="ts">
import GoMyPosition from "./GoMyPosition.vue";
import LoadingIndicator from "../shared/LoadingIndicator.vue";
import SafePlace from "./SafePlace.vue";
import {geolocationErrorUtil} from "~/utils/geolocations/locationUtil";

const initMap = useKakaoMap();
const {$initKakaoMap} = useNuxtApp();
const lat = ref(0);
const lng = ref(0);
const width = ref("100%");
const height = ref("100%");
const mapContID = ref("mapCont");

const resizeMap = (resizeWidth: number, resizeHeight: number) => {
  width.value = resizeWidth + "px";
  height.value = resizeHeight + "px";
  //@ts-ignore
  initMap.value.relayout();
  setCenter(initMap.value, lat.value, lng.value);
};
let resizeHandler: (() => void) | null = null;
onMounted(async () => {
  navigator.geolocation.getCurrentPosition(async ({coords}) => {
    const {map} = await $initKakaoMap(coords.latitude, coords.longitude, true);
    initMap.value = map;
    lat.value = coords.latitude;
    lng.value = coords.longitude;
  }, geolocationErrorUtil);
  watchEffect(() => {
    const mapCont = document.getElementById(mapContID.value);
    if (!mapCont) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const resizeWidth = entry.contentRect.width;
        const resizeHeight = entry.contentRect.height;
        if (entry.contentBoxSize) {
          width.value = resizeWidth + "px";
          height.value = resizeHeight + "px";
          resizeHandler = () =>
            resizeMap(window.innerWidth, window.innerHeight);

          window.addEventListener("resize", resizeHandler);
        }
      }
    });

    resizeObserver.observe(mapCont);
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
      <SafePlace :lat="lat" :lng="lng" />
      <div id="map" :style="`width:${width};height:${height}`"></div>
      <GoMyPosition :lat="lat" :lng="lng" />
    </div>
  </div>
</template>
