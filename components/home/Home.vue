<script setup lang="ts">
import KakaoMap from "../kakaomap/KakaoMap.vue";

const mapCont = ref("mapCont");
const width = ref<string | number | null | undefined>("100%");
const height = ref<string | number | null | undefined>("100%");
onMounted(() => {
  const mapCont = document.getElementById("mapCont");
  width.value = mapCont?.clientWidth;
  height.value = mapCont?.clientHeight;
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        width.value = entry.contentBoxSize[0].inlineSize + "px";
        height.value = entry.contentBoxSize[0].blockSize + "px";
        window.addEventListener("resize", () => {
          width.value = entry.contentBoxSize[0].inlineSize + "px";
          height.value = entry.contentBoxSize[0].blockSize + "px";
        });
      }
    }
  });
  resizeObserver.observe(mapCont!);
});
onUnmounted(() => {
  window.removeEventListener("resize", () => {});
});
</script>
<template>
  <div :id="mapCont" :class="`size-full relative overflow-hidden rounded-md`">
    <KakaoMap :width="width!" :height="height!" />
  </div>
</template>
