<script setup lang="ts">
useHead({
  htmlAttrs: {lang: "ko"},
  link: [{rel: "icon", type: "image/png", href: "favicon.png"}],
});
onMounted(() => {
  // if ("serviceWorker" in navigator) {
  //   navigator.serviceWorker.register("/serviceWoker.ts").then((regist) => {
  //     console.log("service worker is regist", regist);
  //   });
  // }
});
</script>
<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :height="10" :throttle="0" />
    <NuxtPage />
  </NuxtLayout>
</template>
