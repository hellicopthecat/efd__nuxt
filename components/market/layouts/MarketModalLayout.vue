<script setup lang="ts">
import {boolean} from "yup";

const {height} = defineProps({
  height: String,
});
</script>
<template>
  <div
    class="fixed top-[30%] left-0 right-0 z-[99] mx-auto bg-slate-800 w-[90%] xl:w-[50%] p-10 rounded-lg"
    :class="`h-[${height}]`"
  >
    <slot />
  </div>
</template>
