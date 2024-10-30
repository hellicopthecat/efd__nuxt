<script setup lang="ts">
import SharedText from "../shared/SharedText.vue";
import WeatherNow from "./WeatherNow.vue";

const headerOpen = ref(false);

const router = useRouter();
const auth = useAuth();

const logoutHandler = async () => {
  auth.value = false;
  await $fetch("/api/auth/logout", {method: "POST"});
  router.push("/");
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
      <NuxtLink to="/" :class="headerOpen && 'text-vertical'">
        <SharedText tag="h3" txt="ESCAPE FORM DANGER" />
      </NuxtLink>
      <NuxtLink
        v-if="!auth"
        to="/login"
        class="relative flex justify-center items-center bg-slate-600 size-10 p-3 rounded-full"
      >
        <div
          class="absolute bg-slate-600 hover:animate-ping size-10 p-3 rounded-full"
        />
        <Icon name="fa6-solid:lock" class="size-6" />
      </NuxtLink>
      <button
        v-if="auth"
        @click="logoutHandler"
        class="flex justify-center items-center bg-slate-600 size-10 p-3 rounded-full"
      >
        <Icon name="fa6-solid:lock-open" class="size-6" />
      </button>
    </div>

    <WeatherNow :class="headerOpen && 'hidden'" />

    <button
      @click="headerOpneClick"
      class="flex items-center justify-center bg-slate-600 border border-warnYellow size-10 rounded-md mt-auto"
      :class="!headerOpen && 'self-end'"
    >
      <Icon
        name="heroicons-solid:chevron-right"
        class="size-10"
        :class="headerOpen ? 'rotate-0' : 'rotate-180'"
      />
    </button>
  </div>
</template>
