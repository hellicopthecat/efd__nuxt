<script setup lang="ts">
const props = defineProps({
  mouseX: Number,
  mouseY: Number,
  switch: Boolean,
});
</script>
<template>
  <div
    :class="props.switch ? 'scale-y-100 h-full' : 'scale-y-0  h-0'"
    class="flex flex-col gap-3 absolute z-[80] origin-top transition ease-in-out duration-300 bg-slate-500 p-5 rounded-md"
    :style="{top: `${props.mouseY!-200}px`, left: `${props.mouseX!-300}px`}"
  >
    <div class="flex flex-col gap-3 w-full h-full">
      <slot />
    </div>
  </div>
</template>
