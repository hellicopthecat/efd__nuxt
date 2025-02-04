<script setup lang="ts">
import {ACCESSTOKEN} from "./utils/constants/constants";

const {$registServiceWorker, $token} = useNuxtApp();
const accessToken = useCookie(ACCESSTOKEN).value;
const alertTxt = useNewAlert();
useHead({
  htmlAttrs: {lang: "ko"},
  link: [{rel: "icon", type: "image/png", href: "favicon.png"}],
});
const isKakaoApp = () => /KAKAOTALK/i.test(navigator.userAgent);
const requerstAlertPermission = () => {
  if (isKakaoApp() || typeof Notification === "undefined") {
    alert("알림설정을 할 수 없는 브라우저입니다.");
  }
  Notification.requestPermission().then(async (permission) => {
    if (permission === "denied") {
      alertTxt.value = {
        title: "알림이 거절되어있습니다.",
        desc: "알림이 거절되어있습니다.",
        roomId: "",
        itemId: "",
      };
      setTimeout(() => (alertTxt.value = null), 3000);
      return;
    }
    if (permission === "granted") {
      $registServiceWorker();
    }
  });
};
onMounted(async () => {
  if (import.meta.client && typeof Notification !== "undefined") {
    if (Notification.permission === "granted") {
      if (accessToken) {
        await $fetch("/api/auth/updateUserAlertToken", {
          method: "POST",
          body: {token: $token},
        });
      }
    } else {
      requerstAlertPermission();
    }
  } else {
    alert("알림설정을 할 수 없는 브라우저입니다.");
  }
});
</script>
<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :height="10" :throttle="0" />
    <NuxtPage />
  </NuxtLayout>
</template>
