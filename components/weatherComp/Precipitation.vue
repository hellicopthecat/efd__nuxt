<script setup lang="ts">
defineProps({
  weatherType: Number,
});
</script>
<template>
  <NuxtImg
    v-if="weatherType === 0"
    src="/weatherIcon/sunny.png"
    class="size-32"
  />
  <NuxtImg
    v-else-if="weatherType === 1"
    src="/weatherIcon/rainy.png"
    class="size-32"
  />
  <NuxtImg
    v-else-if="weatherType === 2"
    src="/weatherIcon/snowrain.png"
    class="size-32"
  />
  <NuxtImg
    v-else-if="weatherType === 3"
    src="/weatherIcon/snow.png"
    class="size-32"
  />
  <NuxtImg
    v-else-if="weatherType === 4"
    src="/weatherIcon/heavyrain.png"
    class="size-32"
  />
  <NuxtImg
    v-else-if="weatherType === 5"
    src="/weatherIcon/raindrop.png"
    class="size-32"
  />
  <NuxtImg
    v-else-if="weatherType === 6"
    src="/weatherIcon/raindropsnow.png"
    class="size-32"
  />
  <NuxtImg
    v-else-if="weatherType === 7"
    src="/weatherIcon/snowdrop.png"
    class="size-32"
  />
</template>
