<script setup lang="ts">
import type {IItemTypes} from "~/types/userProfile/userProfileItemsType";

const {items} = defineProps<{items: IItemTypes}>();
</script>

<template>
  <li :key="items.id">
    <NuxtLink :href="`/market/${items.id}`" class="flex flex-col size-full">
      <div class="relative size-full rounded-md overflow-hidden aspect-square">
        <NuxtImg
          fit="cover"
          :src="items.itemImageUrl"
          :style="items.complete && 'filter:grayscale(100%)'"
          :alt="items.itemName"
          loading="lazy"
          class="size-full"
        />
      </div>
      <SharedText tag="h4" :txt="items.itemName" />
    </NuxtLink>
  </li>
</template>
