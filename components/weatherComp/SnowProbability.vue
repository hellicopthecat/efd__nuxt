<script setup lang="ts">
import type {HtmlTxtTag} from "~/types/apiType";

interface ISnowProbability {
  tag: HtmlTxtTag;
  probability: number;
  className?: string;
}
defineProps<ISnowProbability>();
</script>
<template>
  <SharedText
    v-if="Number(probability) <= 0 || !Number(probability)"
    :tag="tag"
    txt="적설없음"
    :class-name="className"
  />
  <SharedText
    v-if="Number(probability) > 0 && Number(probability) < 1"
    :tag="tag"
    txt="
      1.0cm 미만
    "
    :class-name="className"
  />
  <SharedText
    v-if="Number(probability) >= 1 && Number(probability) < 5"
    :tag="tag"
    :txt="`${probability}cm`"
    :class-name="className"
  />
  <SharedText
    v-if="Number(probability) > 5"
    :tag="tag"
    txt="5.0cm 이상"
    :class-name="className"
  />
</template>
