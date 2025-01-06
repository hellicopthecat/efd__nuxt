<script setup lang="ts">
import type {GetItemsTypes} from "~/server/api/market/itemList.get";

interface IItemData {
  itemData: GetItemsTypes;
}
defineProps<IItemData>();
</script>
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
    <NuxtLink
      v-for="data in itemData"
      :key="data.id"
      :href="`/market/${data.id}`"
      class="flex flex-col 2xl:flex-row xl:justify-between xl:items-center gap-5 xl:gap-3 p-5 rounded-lg even:bg-slate-700 odd:bg-slate-800 even:hover:bg-slate-600 odd:hover:bg-gray-700"
    >
      <div class="flex md:flex-col lg:flex-row gap-5">
        <NuxtImg :src="data.itemImageUrl" class="size-44 rounded-xl" />
        <div class="flex flex-col justify-center gap-2">
          <div class="flex gap-3 text-nowrap md:text-wrap">
            <SharedText tag="h5" :txt="data.itemSido" />
            <SharedText tag="h5" :txt="data.itemSigungu" />
          </div>

          <div
            class="flex lg:flex-col 2xl:flex-row gap-2 items-center md:items-start"
          >
            <SharedText
              tag="h6"
              :txt="data.complete ? '거래완료' : '판매중'"
              :class-name="
                data.complete
                  ? 'bg-slate-400 px-2 py-1 rounded-lg'
                  : 'bg-green-600 px-2 py-1 rounded-lg'
              "
            />
            <SharedText tag="h3" :txt="data.itemName" />
          </div>
          <SharedText tag="h6" :txt="`@${data.seller.uid}`" />
        </div>
      </div>

      <div
        class="flex flex-col gap-1 items-start xl:items-end self-start md:self-end lg:self-center"
      >
        <SharedText tag="h4" txt="가격 / 교환품목" />
        <SharedText
          tag="h4"
          :txt="
            /^[0-9]+$/.test(data.itemPrice)
              ? `${Number(data.itemPrice).toLocaleString()} 원`
              : String(data.itemPrice)
          "
        />
      </div>
    </NuxtLink>
  </div>
</template>
