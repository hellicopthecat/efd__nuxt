<script setup lang="ts">
defineProps({
  superPeriod: Boolean,
  weatherType: Number,
  className: String,
});
</script>
<template>
  <NuxtImg
    v-if="weatherType === 0 && superPeriod"
    src="/weatherIcon/sunny.png"
    :class="className"
  />
  <NuxtImg
    v-else-if="weatherType === 1 && superPeriod"
    src="/weatherIcon/rainy.png"
    :class="className"
  />
  <NuxtImg
    v-else-if="weatherType === 2 && superPeriod"
    src="/weatherIcon/snowrain.png"
    :class="className"
  />
  <NuxtImg
    v-else-if="weatherType === 3 && superPeriod"
    src="/weatherIcon/snow.png"
    :class="className"
  />
  <NuxtImg
    v-else-if="weatherType === 4 && superPeriod"
    src="/weatherIcon/heavyrain.png"
    :class="className"
  />
  <NuxtImg
    v-else-if="weatherType === 5 && superPeriod"
    src="/weatherIcon/raindrop.png"
    :class="className"
  />
  <NuxtImg
    v-else-if="weatherType === 6 && superPeriod"
    src="/weatherIcon/raindropsnow.png"
    :class="className"
  />
  <NuxtImg
    v-else-if="weatherType === 7 && superPeriod"
    src="/weatherIcon/snowdrop.png"
    :class="className"
  />
  <NuxtImg
    v-else-if="weatherType === 0 && !superPeriod"
    src="/weatherIcon/sunny.png"
    :class="className"
  />
  <NuxtImg
    v-else-if="weatherType === 1 && !superPeriod"
    src="/weatherIcon/rainy.png"
    :class="className"
  />
  <NuxtImg
    v-else-if="weatherType === 2 && !superPeriod"
    src="/weatherIcon/snowrain.png"
    :class="className"
  />
  <NuxtImg
    v-else-if="weatherType === 3 && !superPeriod"
    src="/weatherIcon/snow.png"
    :class="className"
  />
  <NuxtImg
    v-else-if="weatherType === 4 && !superPeriod"
    src="/weatherIcon/heavyrain.png"
    :class="className"
  />
</template>
