<script setup lang="ts">
import SharedText from "../shared/SharedText.vue";
import GlobalNav from "./GlobalNav.vue";
import WeatherNow from "./WeatherNow.vue";
import HomeUser from "../user/HomeUser.vue";
import AlertBubble from "../alert/AlertBubble.vue";

const headerOpen = ref(false);
const {
  data: userID,
  refresh,
  error,
} = await useFetch("/api/auth/getUid", {
  method: "GET",
  server: false,
});
const logoutHandler = async () => {
  await $fetch("/api/auth/logout", {method: "POST"});
  await refresh();
  sessionStorage.removeItem("USERNAV");
  return navigateTo("/");
};
const headerOpenClick = () => {
  headerOpen.value = !headerOpen.value;
};
const detectiveWindowWidth = () => {
  if (window.innerWidth < 1280) {
    headerOpen.value = false;
  }
};
onMounted(async () => {
  window.addEventListener("resize", detectiveWindowWidth);
});
onUnmounted(() => {
  window.removeEventListener("resize", detectiveWindowWidth);
});
</script>
<template>
  <div
    class="flex flex-col items-center origin-left bg-slate-700 p-5 transition-all ease-in-out duration-300 shadow-lg"
    :class="
      headerOpen
        ? 'w-full h-48 xl:w-20 xl:h-full '
        : 'w-full h-80 xl:w-96 xl:h-full gap-5'
    "
  >
    <div
      class="flex gap-10 w-full justify-between xl:justify-start"
      :class="headerOpen && 'xl:flex-col'"
    >
      <NuxtLink to="/" title="홈">
        <SharedText
          tag="h3"
          txt="ESCAPE FORM DANGER"
          :class-name="headerOpen && 'xl:text-vertical'"
        />
      </NuxtLink>
      <NuxtLink
        v-if="!userID"
        to="/login"
        class="relative flex justify-center items-center bg-slate-600 size-10 p-3 rounded-full"
        title="로그인"
      >
        <div
          class="absolute bg-slate-600 hover:animate-ping size-10 p-3 rounded-full"
        />
        <Icon name="fa6-solid:lock" class="size-6" />
      </NuxtLink>
      <button
        v-if="userID"
        @click="logoutHandler"
        class="flex justify-center items-center bg-slate-600 size-10 p-3 rounded-full"
      >
        <Icon name="fa6-solid:lock-open" class="size-6" />
      </button>
    </div>

    <WeatherNow :open="headerOpen" />

    <GlobalNav :open="headerOpen" :user-id="userID" />

    <div
      class="flex items-center w-full mt-auto"
      :class="userID ? 'justify-between' : 'justify-end'"
    >
      <div v-if="userID" class="flex items-center gap-3">
        <HomeUser :class="headerOpen && 'xl:hidden'" />
        <AlertBubble :class="headerOpen && 'xl:hidden'" />
      </div>
      <button
        id="headerOpenBtn"
        @click="headerOpenClick"
        class="flex justify-center items-center rounded-md shadow-lg xl:flex xl:items-center xl:justify-center xl:size-10 xl:scale-100"
      >
        <Icon
          name="heroicons-solid:chevron-right"
          class="size-10 transition-all duration-300 ease-in-out"
          :class="
            headerOpen ? 'rotate-90 xl:rotate-0' : '-rotate-90 xl:rotate-180'
          "
        />
      </button>
    </div>
  </div>
</template>
