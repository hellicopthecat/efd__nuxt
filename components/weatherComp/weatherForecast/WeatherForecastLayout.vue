<script setup lang="ts">
import {palaceLat, palaceLng} from "~/utils/geolocations/locationUtil";
import TodayWeather from "./TodayWeather.vue";
import TomorrowWeather from "./TomorrowWeather.vue";
const lat = ref(0);
const lng = ref(0);
onMounted(() => {
  navigator.geolocation.getCurrentPosition(
    ({coords}) => {
      lat.value = coords.latitude;
      lng.value = coords.longitude;
    },
    () => {
      lat.value = palaceLat;
      lng.value = palaceLng;
    }
  );
});
</script>
<template>
  <div class="flex flex-col gap-10 p-10">
    <TodayWeather :lat="lat" :lng="lng" />
    <TomorrowWeather :lat="lat" :lng="lng" />
  </div>
</template>
