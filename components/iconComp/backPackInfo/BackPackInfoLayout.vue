<script setup lang="ts">
const innerWidth = ref<undefined | number>(undefined);

const props = defineProps({
  mouseX: Number,
  mouseY: Number,
  switch: Boolean,
});
const updateInnerWidht = () => {
  innerWidth.value = window.innerWidth;
};
const infoBoxBoundary = (mouseX: number) => {
  if (mouseX < 200) {
    return 100;
  } else if (mouseX >= 200 && mouseX < 250) {
    return 150;
  } else if (mouseX >= 250 && mouseX < 300) {
    return 200;
  } else if (mouseX >= 300 && mouseX < 365) {
    return 300;
  } else if (mouseX >= 365 && mouseX < 460) {
    return 400;
  } else {
    return 200;
  }
};
onMounted(() => {
  window.addEventListener("resize", updateInnerWidht);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateInnerWidht);
});
</script>
<template>
  <div
    :class="props.switch ? 'scale-y-100 ' : 'scale-y-0  h-0'"
    class="flex flex-col gap-3 absolute z-[80] origin-top transition ease-in-out duration-300 bg-slate-500 p-5 rounded-md w-96"
    :style="{top: `${props.mouseY!-200}px`, left: `${props.mouseX!-infoBoxBoundary(props.mouseX!)}px`}"
  >
    <div class="flex flex-col gap-3 w-full h-full">
      <slot />
    </div>
  </div>
</template>
