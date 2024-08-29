<script setup lang="ts">
const lat = ref();
const lng = ref();

const weather = await useFetch("/api/todayWeather", {
  method: "GET",
  params: {x: lat.value, y: lng.value},
});
console.log(weather);

onMounted(() => {
  navigator.geolocation.getCurrentPosition(({coords}) => {
    lat.value = coords.latitude;
    lng.value = coords.longitude;
  });
});
</script>
<template>
  <div
    class="absolute top-10 left-10 z-50 bg-black opacity-65 w-[30%] h-[20%] rounded-md"
  ></div>
</template>
