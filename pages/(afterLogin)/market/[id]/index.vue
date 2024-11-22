<script setup lang="ts">
import MarketLayer from "~/components/shared/MarketLayer.vue";
import SharedText from "~/components/shared/SharedText.vue";

const auth = useAuth();
const route = useRoute();
const interestUser = ref();
const {data} = useAsyncData(
  `item${route.params.id}`,
  async () =>
    await $fetch("/api/market/getItem", {
      method: "GET",
      query: {id: route.params.id},
    })
);
interestUser.value = data.value?.interested.find(
  (user) => user.id === auth.value.id
);
const interestedBtn = async () => {
  const interest = await $fetch("/api/market/interest", {
    method: "POST",
    query: {uid: auth.value.id, itemID: data.value?.id},
  });
  interestUser.value = interest.interest;
};
const unInterestedBtn = async () => {
  const uninterest = await $fetch("/api/market/uninterest", {
    method: "POST",
    query: {uid: auth.value.id, itemID: data.value?.id},
  });
  interestUser.value = uninterest.interest;
};
</script>
<template>
  <MarketLayer>
    <div class="flex flex-col gap-5">
      <div class="flex justify-between items-center">
        <div class="flex gap-3 *:px-2 *:py-1 *:rounded-lg">
          <div :class="data?.complete ? 'bg-gray-300' : 'bg-green-500'">
            <SharedText
              tag="h5"
              :txt="data?.complete ? '판매완료' : '판매중'"
            />
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
        <div class="flex gap-3">
          <button
            v-if="auth.id === data?.seller.id"
            class="p-2 rounded-md bg-slate-700 hover:bg-slate-800"
          >
            <Icon name="mdi:layers-edit" class="size-8" />
          </button>
          <button
            v-if="interestUser"
            type="button"
            @click.prevent="unInterestedBtn"
            class="p-2 rounded-md bg-slate-700 hover:bg-slate-800"
          >
            <Icon name="mdi:star" class="size-8" />
          </button>
          <button
            v-if="!interestUser"
            type="button"
            @click.prevent="interestedBtn"
            class="p-2 rounded-md bg-slate-700 hover:bg-slate-800"
          >
            <Icon name="mdi:star-outline" class="size-8" />
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-5">
        <div class="self-center rounded-md overflow-hidden">
          <NuxtImg :src="`/testImg/${data?.itemFileName}`" />
        </div>

        <div class="flex flex-col w-full gap-5">
          <div class="flex flex-col gap-5 mb-5 p-3 bg-slate-700 rounded-md">
            <SharedText tag="h1" :txt="data?.itemName" />
            <div>
              <SharedText
                tag="h5"
                :txt="`@${data?.seller.uid}`"
                class-name="text-warnYellow/75"
              />
            </div>
            <SharedText tag="h2" :txt="data?.itemPrice" />
          </div>

          <div class="flex flex-col gap-3">
            <SharedText tag="h4" txt="설명" />
            <div class="p-3 rounded-md bg-slate-700">
              <SharedText tag="p" :txt="data?.itemDesc" />
            </div>
          </div>

          <button
            class="bg-indigo-900 hover:bg-warnYellow hover:text-indigo-900 rounded-md p-3 font-bold"
          >
            구매문의하기
          </button>
        </div>
      </div>
    </div>
  </MarketLayer>
</template>
