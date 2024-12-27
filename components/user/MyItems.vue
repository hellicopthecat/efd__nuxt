<script setup lang="ts">
import type {IItemTypes} from "~/types/userProfile/userProfileItemsType";

const {items} = defineProps<{items: IItemTypes}>();
</script>

<template>
  <li :key="items.id" class="size-full overflow-hidden">
    <NuxtLink :href="`/market/${items.id}`" class="flex flex-col">
      <div class="relative size-72">
        <NuxtImg
          fit="fill"
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
