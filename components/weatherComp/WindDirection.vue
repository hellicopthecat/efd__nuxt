<script setup lang="ts">
import type {HtmlTxtTag} from "~/types/apiType";

interface IWindDirection {
  tag: HtmlTxtTag;
  angle: number;
  className?: string;
}
defineProps<IWindDirection>();
</script>
<template>
  <SharedText
    v-if="Number(angle) >= 0 && Number(angle) < 45"
    :tag="tag"
    txt="북북동"
    :class-name="className"
  />
  <SharedText
    v-else-if="Number(angle) >= 45 && Number(angle) < 90"
    :tag="tag"
    txt="북동동"
    :class-name="className"
  />
  <SharedText
    v-else-if="Number(angle) >= 90 && Number(angle) < 135"
    :tag="tag"
    txt="동남동"
    :class-name="className"
  />
  <SharedText
    v-else-if="Number(angle) >= 135 && Number(angle) < 180"
    :tag="tag"
    txt="남동남"
    :class-name="className"
  />
  <SharedText
    v-else-if="Number(angle) >= 180 && Number(angle) < 225"
    :tag="tag"
    txt="남남서"
    :class-name="className"
  />
  <SharedText
    v-else-if="Number(angle) >= 225 && Number(angle) < 270"
    :tag="tag"
    txt="남서서"
    :class-name="className"
  />
  <SharedText
    v-else-if="Number(angle) >= 270 && Number(angle) < 315"
    :tag="tag"
    txt="서북서"
    :class-name="className"
  />
  <SharedText
    v-else-if="Number(angle) >= 315 && Number(angle) < 360"
    :tag="tag"
    txt="북서북"
    :class-name="className"
  />
</template>
