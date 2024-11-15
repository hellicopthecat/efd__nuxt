<script setup lang="ts">
import MarketLayer from "~/components/shared/MarketLayer.vue";
import SharedText from "~/components/shared/SharedText.vue";
import type {GetItemsTypes} from "~/server/api/market/itemList.get";

const {data: itemData, refresh} = useAsyncData(
  "itemList",
  async () =>
    await $fetch<GetItemsTypes>("/api/market/itemList", {method: "GET"})
);
const handleRefresh = async () => {
  await refresh();
};
</script>

<template>
  <MarketLayer>
    <div class="flex flex-col gap-5">
      <div class="flex gap-5 *:flex *:justify-center *:items-center">
        <NuxtLink
          to="/market/resister"
          class="bg-warnYellow text-slate-800 px-3 py-2 rounded-md text-xl font-bold"
        >
          물품등록
        </NuxtLink>
        <button
          @click="handleRefresh"
          class="bg-warnYellow text-slate-800 px-3 py-2 rounded-md"
        >
          <Icon name="mdi:sync" class="size-8" />
        </button>
      </div>
      <div
        v-for="data in itemData"
        :key="data.id"
        class="flex flex-col gap-3 even:bg-slate-700 odd:bg-slate-800 p-5 rounded-lg even:hover:bg-slate-600 odd:hover:bg-gray-700"
      >
        <div class="flex gap-5">
          <NuxtImg
            :src="`/testImg/${data.itemImageUrl}`"
            class="size-44 rounded-xl"
          />

          <div class="flex flex-col gap-2">
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

            <div class="flex flex-col gap-1">
              <SharedText tag="h4" txt="가격 / 교환품목" />
              <SharedText tag="h4" :txt="data.itemPrice" />
            </div>
            <SharedText tag="h6" :txt="`@${data.seller.uid}`" />
          </div>
        </div>
      </div>
    </div>
  </MarketLayer>
</template>
