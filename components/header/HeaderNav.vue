<script setup lang="ts">
import SharedText from "../shared/SharedText.vue";
import GlobalNav from "./GlobalNav.vue";
import WeatherNow from "./WeatherNow.vue";
import HomeUser from "../user/HomeUser.vue";
import {ACCESSTOKEN} from "~/utils/constants/constants";

const headerOpen = ref(false);

const accessToken = useCookie(ACCESSTOKEN);
const logoutHandler = async () => {
  await $fetch("/api/auth/logout", {method: "POST"});
  sessionStorage.removeItem("USERNAV");
  navigateTo("/");
};
const headerOpenClick = () => {
  headerOpen.value = !headerOpen.value;
};
const detectiveWindowWidth = () => {
  if (window.innerWidth < 1280) {
    headerOpen.value = false;
  }
};
onMounted(() => {
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
      <NuxtLink to="/">
        <SharedText
          tag="h3"
          txt="ESCAPE FORM DANGER"
          :class-name="headerOpen && 'xl:text-vertical'"
          title="홈"
        />
      </NuxtLink>
      <NuxtLink
        v-if="!accessToken"
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
        v-if="accessToken"
        @click="logoutHandler"
        class="flex justify-center items-center bg-slate-600 size-10 p-3 rounded-full"
      >
        <Icon name="fa6-solid:lock-open" class="size-6" />
      </button>
    </div>

    <WeatherNow :open="headerOpen" />

    <GlobalNav :open="headerOpen" />

    <div
      class="flex items-center w-full mt-auto"
      :class="accessToken ? 'justify-between' : 'justify-end'"
    >
      <HomeUser v-if="accessToken" :class="headerOpen && 'xl:hidden'" />
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
