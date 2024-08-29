<script setup lang="ts">
useHead({
  title: "HOME",
});
const weatherData = ref<any>(null);
const fetchWeather = async (lat: number, lng: number) => {
  const {data} = await useAsyncData("todayWeather", () =>
    $fetch("/api/todayWeather", {
      query: {x: lat, y: lng},
    })
  );
  weatherData.value = data;
};
onMounted(async () => {
  navigator.geolocation.getCurrentPosition(({coords}) => {
    fetchWeather(coords.latitude, coords.longitude);
  });
});
</script>

<template>
  <SharedLayout>
    <Home />
    {{ weatherData }}
  </SharedLayout>
</template>
