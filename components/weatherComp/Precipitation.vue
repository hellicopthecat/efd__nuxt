<script setup lang="ts">
defineProps({
  weatherType: Number,
});
</script>
<template>
  <Icon v-if="weatherType === 0" name="wi:day-sunny" class="size-32" />
  <Icon v-else-if="weatherType === 1" name="wi:rain" class="size-32" />
  <Icon v-else-if="weatherType === 2" name="wi:rain-mixn" class="size-32" />
  <Icon v-else-if="weatherType === 3" name="wi:snow" class="size-32" />
  <Icon v-else-if="weatherType === 4" name="wi:showers" class="size-32" />
  <Icon v-else-if="weatherType === 5" name="wi:raindrops" class="size-32" />
  <Icon v-else-if="weatherType === 6" name="wi:rain-wind" class="size-32" />
  <Icon v-else-if="weatherType === 7" name="wi:snow-wind" class="size-32" />
</template>
