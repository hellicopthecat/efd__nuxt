<script setup lang="ts">
import ItemData from "~/components/market/ItemData.vue";
import FullCoverLoading from "~/components/shared/FullCoverLoading.vue";
import MarketLayer from "~/components/shared/MarketLayer.vue";
import type {GetItemsTypes} from "~/server/api/market/itemList.get";

const datalength = ref(4);
const observer = ref<IntersectionObserver | null>(null);
const prevData = ref<GetItemsTypes | null>(null);
const {data, refresh, status} = await useFetch<GetItemsTypes>(
  "/api/market/itemList",
  {method: "GET", query: {page: datalength.value}, key: "itemList"}
);

const handleRefresh = async () => {
  await refresh();
};

const observerRefresh = async () => {
  datalength.value += 1;
  prevData.value = data.value;
  await refresh();
};

onMounted(() => {
  const observeBox = document.getElementById("observeBox");
  observer.value = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting) {
      await observerRefresh();
    }
  });
  if (observeBox) {
    observer.value.observe(observeBox);
  }
});
onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});
useSeoMeta({
  title: "돕고돕기",
  description: "재난구호 물품/현찰 거래",
  ogTitle: "돕고돕기",
  ogDescription: "재난구호 물품/현찰 거래",
  twitterTitle: "돕고돕기",
  twitterDescription: "재난구호 물품/현찰 거래",
  twitterCard: "app",
});
</script>

<template>
  <MarketLayer>
    <FullCoverLoading :loading="status === 'pending'" />
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
      <ItemData :itemData="data as GetItemsTypes" />
      <div
        id="observeBox"
        class="border-2 border-slate-400/50 border-dashed"
      ></div>
    </div>
  </MarketLayer>
</template>
