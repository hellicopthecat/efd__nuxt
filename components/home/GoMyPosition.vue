<script setup lang="ts">
import {panTo, zoomOut} from "~/utils/kakaomap";
import {palaceLat, palaceLng} from "../../utils/geolocations/locationUtil";
const {lat, lng} = defineProps({
  lat: Number,
  lng: Number,
});

const initMap = useKakaoMap();
const currentBtn = useCurrentBtnId();
const goMyPosition = (map: any, lat: number, lng: number) => {
  zoomOut(map);
  panTo(map, lat || palaceLat, lng || palaceLng);
  currentBtn.value = "";
};
</script>
<template>
  <button
    @click="goMyPosition(initMap, Number(lat), Number(lng))"
    class="absolute z-50 bottom-10 right-10 bg-darkBlue size-12 rounded-xl flex justify-center items-center"
  >
    <Icon name="heroicons:map-pin-solid" class="text-warnYellow" />
  </button>
</template>
