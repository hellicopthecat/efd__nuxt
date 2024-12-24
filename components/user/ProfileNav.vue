<script setup lang="ts">
import SharedText from "../shared/SharedText.vue";
const {index} = defineProps({index: Number});
const emit = defineEmits(["editCurrentIndex"]);
const cIndexMarker = (current: number) => {
  if (current === 0) {
    return "top-0";
  } else if (current === 1) {
    return "top-20";
  } else if (current === 2) {
    return "top-40";
  } else {
    return "top-0";
  }
};
</script>
<template>
  <nav class="p-10 flex flex-col gap-10 min-w-96 h-full">
    <SharedText tag="h2" txt="회원정보" />
    <ul class="relative *:px-10 *:py-2 *:mr-5 *:w-full *:h-20">
      <div
        class="absolute border-r-4 border-r-green-400 transition-all duration-150 ease-in-out"
        :class="`${cIndexMarker(index!)}`"
      />
      <li class="relative z-10">
        <button
          @click="$emit('editCurrentIndex', 0)"
          class="flex gap-5 items-center"
        >
          <Icon name="mdi:user-outline" class="size-16" />
          <SharedText tag="h3" txt="회원정보" />
        </button>
      </li>
      <li class="relative z-10">
        <button
          @click="$emit('editCurrentIndex', 1)"
          class="flex gap-5 items-center"
        >
          <Icon name="mdi:package-variant-closed" class="size-16" />
          <SharedText tag="h3" txt="판매품" />
        </button>
      </li>
      <li class="relative z-10">
        <button
          @click="$emit('editCurrentIndex', 2)"
          class="flex gap-5 items-center"
        >
          <Icon name="mdi:star-check-outline" class="size-16" />
          <SharedText tag="h3" txt="관심품목" />
        </button>
      </li>
    </ul>
  </nav>
</template>
