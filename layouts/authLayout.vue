<script setup lang="ts">
import SharedText from "~/components/shared/SharedText.vue";
useHead({
  titleTemplate: "%s | EFD",
});
</script>

<template>
  <div class="flex flex-col bg-darkBlue overflow-hidden h-dvh">
    <NuxtLink to="/" class="absolute top-10 left-10 z-[99]">
      <SharedText
        tag="h3"
        txt="ESCAPE FROM DANGER"
        :class-name="'text-warnYellow'"
      />
    </NuxtLink>
    <main
      class="relative text-white flex justify-center items-center *:transition-all *:duration-200 *:ease-in-out h-full"
    >
      <div
        class="absolute -left-40 -top-96 size-[600px] lg:size-[800px] 2xl:size-[1200px] rounded-full bg-gradient-to-br from-blue-600 to-darkBlue blur-xl"
      />
      <div
        class="animate-pulse absolute -left-40 -top-96 size-[600px] lg:size-[800px] 2xl:size-[1200px] rounded-full bg-gradient-to-br from-blue-600 to-darkBlue blur-xl"
      />
      <div
        class="absolute -right-10 top-10 size-56 xl:size-96 rounded-full bg-gradient-to-b from-cyan-600 to-darkBlue blur-xl"
      />
      <div
        class="animate-pulse absolute -right-10 top-10 size-56 xl:size-96 rounded-full bg-gradient-to-b from-cyan-600 to-darkBlue blur-xl"
      />
      <div
        class="absolute right-10 xl:right-72 -bottom-10 size-72 rounded-full bg-gradient-to-b from-blue-600 to-indigo-900 blur-xl"
      />
      <div
        class="animate-pulse absolute right-10 xl:right-72 -bottom-10 size-72 rounded-full bg-gradient-to-b from-blue-600 to-indigo-900 blur-xl"
      />
      <div
        class="relative z-50 flex flex-col gap-5 justify-center xl:items-end w-full xl:h-full p-10"
      >
        <slot />
      </div>
    </main>
  </div>
</template>
