<script setup lang="ts">
import KakaoMap from "../kakaomap/KakaoMap.vue";
import SafePlace from "./SafePlace.vue";
const mapCont = ref("mapCont");
const width = ref<string | number | null | undefined>(0);
const height = ref<string | number | null | undefined>(0);
const initMap = useKakaoMap();
onMounted(() => {
  const mapCont = document.getElementById("mapCont");
  width.value = mapCont?.clientWidth;
  height.value = mapCont?.clientHeight;
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        width.value = entry.contentRect.width + "px";
        height.value = entry.contentRect.height + "px";
        window.addEventListener("resize", () => {
          width.value = entry.contentRect.width + "px";
          height.value = entry.contentRect.height + "px";
          //@ts-ignore
          initMap.value.relayout();
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
  <div :id="mapCont" class="relative w-full h-full overflow-hidden">
    <SafePlace />
    <KakaoMap :width="width!" :height="height!" />
  </div>
</template>
