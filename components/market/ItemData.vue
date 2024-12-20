<script setup lang="ts">
import type {GetItemsTypes} from "~/server/api/market/itemList.get";

interface IItemData {
  itemData: GetItemsTypes;
}
defineProps<IItemData>();
</script>
<template>
  <NuxtLink
    v-for="data in itemData"
    :key="data.id"
    :href="`/market/${data.id}`"
    class="flex justify-between items-center p-5 rounded-lg even:bg-slate-700 odd:bg-slate-800 even:hover:bg-slate-600 odd:hover:bg-gray-700"
  >
    <div class="flex gap-5">
      <NuxtImg :src="data.itemImageUrl" class="size-44 rounded-xl" />
      <div class="flex flex-col justify-center gap-2">
        <div class="flex gap-3">
          <SharedText tag="h5" :txt="data.itemSido" />
          <SharedText tag="h5" :txt="data.itemSigungu" />
        </div>

        <div class="flex gap-2 items-center">
          <div class="flex">
            <SharedText
              tag="h6"
              :txt="data.complete ? '거래완료' : '판매중'"
              :class-name="
                data.complete
                  ? 'bg-slate-400 px-2 py-1 rounded-lg'
                  : 'bg-green-600 px-2 py-1 rounded-lg'
              "
            />
          </div>
          <SharedText tag="h3" :txt="data.itemName" />
        </div>
        <SharedText tag="h6" :txt="`@${data.seller.uid}`" />
      </div>
    </div>

    <div class="flex flex-col items-end gap-1">
      <SharedText tag="h4" txt="가격 / 교환품목" />
      <SharedText tag="h4" :txt="data.itemPrice" />
    </div>
  </NuxtLink>
</template>
