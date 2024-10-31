<script setup lang="ts">
import TodayWeather from "~/components/weatherComp/weatherForecast/TodayWeather.vue";
import TomorrowWeather from "~/components/weatherComp/weatherForecast/TomorrowWeather.vue";

useHead({title: "날씨"});
</script>
<template>
  <div class="flex flex-col gap-10 p-10 bg-darkBlue">
    <TodayWeather />
    <TomorrowWeather />
  </div>
</template>
