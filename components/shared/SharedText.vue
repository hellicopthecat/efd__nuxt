<script setup lang="ts">
import type {HtmlTxtTag} from "~/types/apiType";

interface ISharedTxt {
  id?: string;
  tag: HtmlTxtTag;
  txt?: string;
  className?: string | boolean;
}
const {id, tag, txt, className} = defineProps<ISharedTxt>();
</script>
<template>
  <h1
    v-if="tag === 'h1'"
    :id="id"
    :class="`text-7xl font-extrabold ${className}`"
  >
    {{ txt }}
  </h1>
  <h2 v-if="tag === 'h2'" :id="id" :class="`text-5xl font-bold ${className}`">
    {{ txt }}
  </h2>
  <h3 v-if="tag === 'h3'" :id="id" :class="`text-3xl font-bold ${className}`">
    {{ txt }}
  </h3>
  <h4
    v-if="tag === 'h4'"
    :id="id"
    :class="`text-xl font-semibold ${className}`"
  >
    {{ txt }}
  </h4>
  <h5
    v-if="tag === 'h5'"
    :id="id"
    :class="`text-lg font-semibold ${className}`"
  >
    {{ txt }}
  </h5>
  <h6 v-if="tag === 'h6'" :id="id" :class="`text-lg ${className}`">
    {{ txt }}
  </h6>
  <span v-if="tag === 'span'" :class="`text-sm ${className}`">{{ txt }}</span>
  <p v-if="tag === 'p'" :class="` ${className}`">{{ txt }}</p>
  <small v-if="tag === 'small'" :class="`text-xs ${className}`">{{
    txt
  }}</small>
  <label v-if="tag === 'label'" :for="id" :class="`${className}`">{{
    txt
  }}</label>
</template>
