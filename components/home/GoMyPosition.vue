<script setup lang="ts">
import {geolocationErrorUtil} from "~/utils/geolocations/locationUtil";
import {panTo, zoomOut} from "~/utils/kakaomap";
const lat = ref();
const lng = ref();
const initMap = useKakaoMap();
const currentBtn = useCurrentBtnId();
const goMyPosition = (map: any, lat: number, lng: number) => {
  zoomOut(map);
  panTo(map, lat, lng);
  currentBtn.value = "";
};
onMounted(() => {
  navigator.geolocation.getCurrentPosition(({coords}) => {
    lat.value = coords.latitude;
    lng.value = coords.longitude;
  }, geolocationErrorUtil);
});
</script>
<template>
  <button
    @click="goMyPosition(initMap, lat, lng)"
    class="absolute z-50 bottom-10 right-10 bg-darkBlue size-12 rounded-xl flex justify-center items-center"
  >
    <Icon name="heroicons:map-pin-solid" class="text-warnYellow" />
  </button>
</template>
