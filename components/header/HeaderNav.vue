<script setup lang="ts">
import {ACCESSTOKEN} from "~/utils/constants/constants";
import SharedText from "../shared/SharedText.vue";
import GlobalNav from "./GlobalNav.vue";
import WeatherNow from "./WeatherNow.vue";
import HomeUser from "../user/HomeUser.vue";

const headerOpen = ref(false);

const accessToken = useCookie(ACCESSTOKEN);
const logoutHandler = async () => {
  await $fetch("/api/auth/logout", {method: "POST"});
  sessionStorage.removeItem("USERNAV");
  navigateTo("/");
};
const headerOpneClick = () => {
  headerOpen.value = !headerOpen.value;
};
</script>
<template>
  <div
    class="flex flex-col items-center gap-5 h-full origin-left bg-slate-700 p-5 transition-all ease-in-out duration-150"
    :class="headerOpen ? 'w-20' : 'w-96'"
  >
    <div class="flex gap-10" :class="headerOpen && 'flex-col'">
      <NuxtLink to="/">
        <SharedText
          tag="h3"
          txt="ESCAPE FORM DANGER"
          :class-name="headerOpen && 'text-vertical'"
        />
      </NuxtLink>
      <NuxtLink
        v-if="!accessToken"
        to="/login"
        class="relative flex justify-center items-center bg-slate-600 size-10 p-3 rounded-full"
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

    <WeatherNow :class="headerOpen && 'hidden'" />

    <GlobalNav :class="headerOpen && 'hidden'" />

    <div
      class="flex items-center w-full mt-auto"
      :class="accessToken ? 'justify-between' : 'justify-end'"
    >
      <HomeUser v-if="accessToken" :class="headerOpen && 'hidden'" />
      <button
        @click="headerOpneClick"
        class="flex items-center justify-center bg-slate-600 border border-warnYellow size-10 rounded-md"
      >
        <Icon
          name="heroicons-solid:chevron-right"
          class="size-10"
          :class="headerOpen ? 'rotate-0' : 'rotate-180'"
        />
      </button>
    </div>
  </div>
</template>
