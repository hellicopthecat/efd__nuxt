<script setup lang="ts">
import MarketLayer from "~/components/shared/MarketLayer.vue";
import SharedText from "~/components/shared/SharedText.vue";

const route = useRoute();
const {data} = useAsyncData(
  `item${route.params.id}`,
  async () =>
    await $fetch("/api/market/getItem", {
      method: "GET",
      query: {id: route.params.id},
    })
);
console.log(data.value?.complete);
</script>
<template>
  <MarketLayer>
    <div class="flex flex-col gap-5">
      <div class="w-96 self-center">
        <NuxtImg :src="`/testImg/${data?.itemFileName}`" />
      </div>

      <div class="flex gap-3 *:px-2 *:py-1 *:rounded-lg">
        <div :class="data?.complete ? 'bg-gray-300' : 'bg-green-500'">
          <SharedText tag="h5" :txt="data?.complete ? '판매완료' : '판매중'" />
        </div>

        <SharedText
          tag="h5"
          :txt="data?.itemSido"
          :class-name="'bg-slate-600'"
        />
        <SharedText
          tag="h5"
          :txt="data?.itemSigungu"
          :class-name="'bg-slate-600'"
        />
        <SharedText
          tag="h5"
          :txt="data?.itemRoadAdress"
          :class-name="'bg-slate-600'"
        />
      </div>

      <div class="flex flex-col gap-5 mb-5">
        <SharedText tag="h1" :txt="data?.itemName" />
        <SharedText tag="h2" :txt="data?.itemPrice" />
      </div>

      <div class="flex flex-col gap-3">
        <SharedText tag="h4" txt="설명" />
        <div class="p-3 rounded-md bg-slate-700">
          <SharedText tag="p" :txt="data?.itemDesc" />
        </div>
      </div>
    </div>
  </MarketLayer>
</template>
