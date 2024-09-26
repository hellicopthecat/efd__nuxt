<script setup lang="ts">
defineProps({
  power: Number,
  className: String,
});
</script>
<template>
  <SharedText
    v-if="Number(power) < 4"
    tag="h4"
    :txt="`약한바람 (${power} m/s)`"
    :class-name="className"
  />
  <SharedText
    v-if="Number(power) > 4 && Number(power) < 9"
    tag="h4"
    :txt="`약한 강한 바람 (${power} m/s)`"
    :class-name="className"
  />
  <SharedText
    v-if="Number(power) > 9 && Number(power) < 14"
    tag="h4"
    :txt="`강한 바람 (${power} m/s)`"
    :class-name="className"
  />
  <SharedText
    v-if="Number(power) > 14"
    tag="h4"
    :txt="`매우 강한 바람 (${power} m/s)`"
    :class-name="className"
  />
</template>
