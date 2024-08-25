<script setup lang="ts">
interface IKakaoMapProps {
  width: number | string;
  height: number | string;
}
defineProps<IKakaoMapProps>();
const lat = ref<number | null>(null);
const lon = ref<number | null>(null);
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
      //@ts-ignore
      const marker = new kakao.maps.Marker({position: myPosition});
      marker.setMap(map);
    });
  });
});
</script>
<template>
  <div id="map" :style="`width:${width};height:${height}`"></div>
</template>
