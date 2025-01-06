<script setup lang="ts">
import SharedText from "../shared/SharedText.vue";
const {index} = defineProps({index: Number});
const emit = defineEmits(["editCurrentIndex"]);
const cIndexMarker = (current: number) => {
  if (current === 0) {
    return "w-[33.3%] left-0 xl:left-0  xl:w-full xl:top-0";
  } else if (current === 1) {
    return "w-[33.3%] left-[33.4%] xl:left-0  xl:w-full xl:top-20";
  } else if (current === 2) {
    return "w-[33.3%] left-[66.6%] xl:left-0  xl:w-full xl:top-40";
  } else {
    return "w-[33.3%] left-0  xl:left-0 xl:w-full xl:top-0";
  }
};
</script>
<template>
  <nav class="relative p-10 flex flex-col gap-10 min-w-96">
    <SharedText tag="h2" txt="회원정보" />
    <ul
      class="relative flex justify-around items-center xl:block xl:*:px-10 *:py-2 group *:h-20"
    >
      <div
        class="absolute left-0 -bottom-10 border-b-4 border-b-green-400 xl:border-b-0 xl:border-r-4 xl:border-r-green-400 transition-all duration-150 ease-in-out"
        :class="`${cIndexMarker(index!)}`"
      />
      <li class="relative z-10 group:w-[33.3%] xl:group:w-full">
        <button
          @click="$emit('editCurrentIndex', 0)"
          class="flex flex-col xl:flex-row gap-5 items-center"
        >
          <Icon name="mdi:user-outline" class="size-8 xl:size-16" />
          <h3 class="text-2xl xl:text-3xl text-nowrap">회원정보</h3>
        </button>
      </li>
      <li class="relative z-10 group:w-[33.3%] xl:group:w-full">
        <button
          @click="$emit('editCurrentIndex', 1)"
          class="flex flex-col xl:flex-row gap-5 items-center"
        >
          <Icon name="mdi:package-variant-closed" class="size-8 xl:size-16" />
          <h3 class="text-2xl xl:text-3xl text-nowrap">판매품</h3>
        </button>
      </li>
      <li class="relative z-10 group:w-[33.3%] xl:group:w-full">
        <button
          @click="$emit('editCurrentIndex', 2)"
          class="flex flex-col xl:flex-row gap-5 items-center"
        >
          <Icon name="mdi:star-check-outline" class="size-8 xl:size-16" />
          <h3 class="text-2xl xl:text-3xl text-nowrap">관심품목</h3>
        </button>
      </li>
    </ul>
  </nav>
</template>
