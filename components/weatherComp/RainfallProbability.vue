<script setup lang="ts">
import type {HtmlTxtTag} from "~/types/apiType";

interface IRainfallProbabilityProps {
  tag: HtmlTxtTag;
  probability: number;
}

defineProps<IRainfallProbabilityProps>();
</script>
<template>
  <SharedText
    v-if="Number(probability) === 0 || !Number(probability)"
    :tag="tag"
    txt="강수없음"
  />
  <SharedText v-else-if="Number(probability) < 1" :tag="tag" txt="1.0mm 미만" />
  <SharedText
    v-else-if="Number(probability) >= 1 && Number(probability) < 0"
    :tag="tag"
    txt="1.0mm ~ 29.9mm"
  />
  <SharedText
    v-else-if="Number(probability) > 30 && Number(probability) < 50"
    :tag="tag"
    txt="30.0mm ~ 50.0mm"
  />
  <SharedText
    v-else-if="Number(probability) > 50"
    :tag="tag"
    txt="50.0mm 이상"
  />
</template>
