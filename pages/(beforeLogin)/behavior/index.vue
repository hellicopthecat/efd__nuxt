<script setup lang="ts">
useSeoMeta({
  title: "재난시 행동요령",
  description: "재난시 행동요령(자연,사회,생활안전,민방위)",
  ogTitle: "재난시 행동요령",
  ogDescription: "재난시 행동요령(자연,사회,생활안전,민방위)",
  ogImage: "/pwaIcons/icon-512.png",
  ogUrl: "https://efd.netlify.app/behavior",
  twitterTitle: "재난시 행동요령",
  twitterDescription: "재난시 행동요령(자연,사회,생활안전,민방위)",
  twitterImage: "/pwaIcons/icon-512.png",
  twitterCard: "app",
});
</script>
<template>
  <div class="flex justify-center items-center w-full h-full p-10">
    <ul
      class="grid grid-cols-2 gap-5 text-center *:bg-slate-700 w-full h-20 *:w-full xl:*:w-96 *:rounded-md hover:*:bg-slate-500"
    >
      <li class="xl:place-self-end">
        <NuxtLink to="/behavior/natural-behavior">
          <SharedText tag="h5" txt="자연재난" class-name="leading-[80px]" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/behavior/social-behavior">
          <SharedText tag="h5" txt="사회재난" class-name="leading-[80px]" />
        </NuxtLink>
      </li>
      <li class="xl:place-self-end">
        <NuxtLink to="/behavior/life-safety">
          <SharedText tag="h5" txt="생활안전" class-name="leading-[80px]" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/behavior/civil-defence">
          <SharedText tag="h5" txt="민방위" class-name="leading-[80px]" />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
