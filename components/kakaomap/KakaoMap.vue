<script setup lang="ts">
import {makeMarker} from "~/utils/kakaomap";

interface IKakaoMapProps {
  width: number | string;
  height: number | string;
}
defineProps<IKakaoMapProps>();

const lat = ref<number | null>(null);
const lon = ref<number | null>(null);
const initMap = useKakaoMap();
onMounted(() => {
  navigator.geolocation.getCurrentPosition((position) => {
    lat.value = position.coords.latitude;
    lon.value = position.coords.longitude;
    //@ts-ignore
    kakao.maps.load(() => {
      const container = document.getElementById("map");
      //@ts-ignore
      const myPosition = new kakao.maps.LatLng(lat.value, lon.value);
      const options = {
        center: myPosition,
        level: 3,
      };
      //@ts-ignore
      const map = new kakao.maps.Map(container, options);
      initMap.value = map;
      //make marker
      const {marker} = makeMarker(myPosition);
      marker.setMap(map);
    });
  });
});
</script>
<template>
  <div id="map" :style="`width:${width};height:${height}`"></div>
</template>
