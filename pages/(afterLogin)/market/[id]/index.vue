<script setup lang="ts">
import EditProduct from "~/components/market/edit-product.vue";
import FullCoverLoading from "~/components/shared/FullCoverLoading.vue";
import MarketLayer from "~/components/shared/MarketLayer.vue";
import SharedText from "~/components/shared/SharedText.vue";

//hooks
const route = useRoute();
const router = useRouter();
//state
const interestUser = ref();
//data
const uid = await $fetch("/api/auth/getUid", {method: "GET"});
const {data, status} = await useFetch("/api/market/getItem", {
  method: "GET",
  query: {id: route.params.id},
  key: `item${route.params.id}`,
});

interestUser.value = data.value?.interested.find(
  (user) => user.id === Number(uid)
);
//fn
const interestedBtn = async () => {
  const interest = await $fetch("/api/market/interest", {
    method: "POST",
    query: {uid: uid, itemID: data.value?.id},
  });
  interestUser.value = interest.interest;
};
const unInterestedBtn = async () => {
  const uninterest = await $fetch("/api/market/uninterest", {
    method: "POST",
    query: {uid: uid, itemID: data.value?.id},
  });
  interestUser.value = uninterest.interest;
};
const goBack = () => router.push("/market");
//modal
const showModal = computed(() => route.query.modal === "edit");
const openModal = () => {
  router.push({query: {modal: "edit"}});
};
const closeModal = () => {
  router.push({query: {modal: undefined}});
};
// deletItem
const deleteItem = async () => {
  const {
    data: result,
    error,
    refresh,
  } = await useFetch("/api/market/deleteItem", {
    method: "POST",
    query: {id: data.value?.id},
  });
  if (!result.value?.ok) {
    alert(error.value?.message);
  } else {
    alert("삭제되었습니다.");
    router.push("/market");
  }
};
const createRoom = async () => {
  await $fetch("/api/chatting/createRoom", {method: "POST"});
};

//meta
useSeoMeta({
  title: () => data.value?.itemName + "",
  description: () => data.value?.itemDesc + "",
  ogTitle: () => data.value?.itemName + "",
  ogDescription: () => data.value?.itemDesc + "",
  ogImage: () => data.value?.itemImageUrl,
  ogUrl: () => `/market/${data.value?.id}`,
  twitterTitle: () => data.value?.itemName + "",
  twitterDescription: () => data.value?.itemDesc + "",
  twitterImage: "/pwaIcons/icon-512.png",
  twitterCard: "app",
});
</script>
<template>
  <MarketLayer>
    <FullCoverLoading
      v-if="status === 'pending'"
      :loading="status === 'pending'"
    />
    <div v-else class="flex flex-col gap-5">
      <div class="flex flex-col gap-3 md:flex-row justify-between items-center">
        <!-- badges -->
        <div
          class="flex items-center gap-3 *:px-2 *:py-1 *:rounded-lg *:text-nowrap"
        >
          <button
            @click.prevent="goBack"
            class="flex justify-center items-center"
          >
            <Icon name="mdi:chevron-left" class="size-8" />
          </button>
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
        <!-- Fn badges -->
        <div class="flex self-end xl:self-start gap-3">
          <button
            v-if="Number(uid) === data?.seller.id"
            @click.prevent="openModal"
            class="p-2 rounded-md bg-slate-700 hover:bg-slate-800"
          >
            <Icon name="mdi:pencil" class="size-8" />
          </button>
          <button
            v-if="Number(uid) === data?.seller.id"
            @click.prevent="deleteItem"
            class="p-2 rounded-md bg-slate-700 hover:bg-slate-800"
          >
            <Icon name="mdi:trash-can" class="size-8" />
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

      <div class="grid grid-cols-1 2xl:grid-cols-2 gap-5">
        <div class="flex justify-center w-full rounded-md overflow-hidden">
          <NuxtImg :src="data?.itemImageUrl" class="size-full" />
        </div>

        <div class="flex flex-col w-full gap-3">
          <div class="flex flex-col gap-2 mb-5 p-5 bg-slate-700 rounded-md">
            <SharedText
              tag="h5"
              :txt="`@${data?.seller.uid}`"
              class-name="text-warnYellow/75"
            />
            <div class="flex justify-between">
              <SharedText tag="h3" :txt="data?.itemName" />
              <SharedText
                tag="p"
                class-name="text-lg font-semibold"
                :txt="data?.itemPrice"
              />
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <SharedText tag="h4" txt="설명" />
            <div class="p-3 rounded-md bg-slate-700">
              <SharedText tag="p" :txt="data?.itemDesc" />
            </div>
          </div>

          <button
            class="bg-indigo-900 hover:bg-warnYellow hover:text-indigo-900 rounded-md p-3 font-bold"
            @click.prevent="createRoom"
          >
            구매문의하기
          </button>
        </div>
      </div>
    </div>
    <ClientOnly>
      <Teleport to="#defaultLayout">
        <div v-if="showModal" class="flex justify-center items-center">
          <div
            @click.prevent="closeModal"
            class="fixed left-0 top-0 bg-black/50 size-full z-[99]"
          ></div>
          <EditProduct />
        </div>
      </Teleport>
    </ClientOnly>
  </MarketLayer>
</template>
