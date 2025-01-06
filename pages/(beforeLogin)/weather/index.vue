<script setup lang="ts">
import TodayWeather from "~/components/weatherComp/weatherForecast/TodayWeather.vue";
import TomorrowWeather from "~/components/weatherComp/weatherForecast/TomorrowWeather.vue";

useHead({title: "날씨"});
useSeoMeta({
  title: "날씨",
  description: "날씨(Weather)",
  ogTitle: "날씨",
  ogDescription: "날씨(Weather)",
  twitterTitle: "날씨",
  twitterDescription: "날씨(Weather)",
  twitterCard: "app",
});
</script>
<template>
  <div class="flex flex-col gap-10 p-10">
    <TodayWeather />
    <TomorrowWeather />
  </div>
</template>
