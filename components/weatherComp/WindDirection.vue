<script setup lang="ts">
defineProps({
  angle: Number,
});
</script>
<template>
  <SharedText
    v-if="Number(angle) >= 0 && Number(angle) < 45"
    tag="h3"
    txt="북북동"
  />
  <SharedText
    v-else-if="Number(angle) >= 45 && Number(angle) < 90"
    tag="h3"
    txt="북동동"
  />
  <SharedText
    v-else-if="Number(angle) >= 90 && Number(angle) < 135"
    tag="h3"
    txt="동남동"
  />
  <SharedText
    v-else-if="Number(angle) >= 135 && Number(angle) < 180"
    tag="h3"
    txt="남동남"
  />
  <SharedText
    v-else-if="Number(angle) >= 180 && Number(angle) < 225"
    tag="h3"
    txt="남남서"
  />
  <SharedText
    v-else-if="Number(angle) >= 225 && Number(angle) < 270"
    tag="h3"
    txt="남서서"
  />
  <SharedText
    v-else-if="Number(angle) >= 270 && Number(angle) < 315"
    tag="h3"
    txt="서북서"
  />
  <SharedText
    v-else-if="Number(angle) >= 315 && Number(angle) < 360"
    tag="h3"
    txt="북서북"
  />
</template>
