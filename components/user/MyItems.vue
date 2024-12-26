<script setup lang="ts">
import type {IItemTypes} from "~/types/userProfile/userProfileItemsType";

const {items} = defineProps<{items: IItemTypes}>();
</script>

<template>
  <li :key="items.id">
    <NuxtLink :href="`/market/${items.id}`">
      <div class="overflow-hidden size-full">
        <NuxtImg
          :src="items.itemImageUrl"
          :style="items.complete && 'filter:grayscale(100%)'"
          class="size-full"
          :alt="items.itemName"
          loading="lazy"
        />
      </div>
      <SharedText tag="h4" :txt="items.itemName" />
    </NuxtLink>
  </li>
</template>
