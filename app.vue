<script setup lang="ts">
import {ACCESSTOKEN, REFRESHTOKEN} from "./utils/constants/constants";

const {$registServiceWorker, $token} = useNuxtApp();
const accessToken = useCookie(ACCESSTOKEN).value;

useHead({
  htmlAttrs: {lang: "ko"},
  link: [{rel: "icon", type: "image/png", href: "favicon.png"}],
});

onMounted(async () => {
  if (import.meta.client) {
    if (Notification.permission === "granted") {
      if (accessToken) {
        await $fetch("/api/auth/updateUserAlertToken", {
          method: "POST",
          body: {token: $token},
        });
      }
    } else {
      Notification.requestPermission().then(async (permission) => {
        if (permission === "denied") {
          console.log("denied");
          return;
        }
        if (permission === "granted") {
          $registServiceWorker();
          console.log($token);
        }
      });
    }
  }
});
</script>
<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :height="10" :throttle="0" />
    <NuxtPage />
  </NuxtLayout>
</template>
