<script setup lang="ts">
import TodayWeather from "~/components/weatherComp/weatherForecast/TodayWeather.vue";
import TomorrowWeather from "~/components/weatherComp/weatherForecast/TomorrowWeather.vue";

useSeoMeta({
  title: "날씨",
  description: "날씨(Weather)",
  ogTitle: "날씨",
  ogDescription: "날씨(Weather)",
  ogImage: "/pwaIcons/icon-512.png",
  ogUrl: "https://efd.netlify.app/weather",
  twitterTitle: "날씨",
  twitterDescription: "날씨(Weather)",
  twitterImage: "/pwaIcons/icon-512.png",
  twitterCard: "app",
});
</script>
<template>
  <div class="flex flex-col gap-10 p-10">
    <TodayWeather />
    <TomorrowWeather />
  </div>
</template>
