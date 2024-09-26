<script setup lang="ts">
import type {HtmlTxtTag} from "~/types/apiType";

interface ISkyStatusProps {
  tag: HtmlTxtTag;
  className?: string;
  skyStatus: number;
}
defineProps<ISkyStatusProps>();
</script>
<template>
  <SharedText
    v-if="skyStatus === 1"
    :tag="tag"
    txt="맑음"
    :class-name="className"
  />
  <SharedText
    v-if="skyStatus === 3"
    :tag="tag"
    txt="구름많음"
    :class-name="className"
  />
  <SharedText
    v-if="skyStatus === 4"
    :tag="tag"
    txt="흐림"
    :class-name="className"
  />
</template>
