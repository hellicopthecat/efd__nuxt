<script setup lang="ts">
import CreateRoomBtn from "~/components/market/CreateRoomBtn.vue";
import EditProduct from "~/components/market/EditProduct.vue";
import ItemBadge from "~/components/market/ItemBadge.vue";
import ItemFnBadges from "~/components/market/ItemFnBadges.vue";
import FullCoverLoading from "~/components/shared/FullCoverLoading.vue";
import MarketLayer from "~/components/shared/MarketLayer.vue";
import SharedText from "~/components/shared/SharedText.vue";

//hooks
const route = useRoute();
const router = useRouter();
//state
const interestUser = ref(false);

//data
const {data: uid} = await useFetch("/api/auth/getUid", {method: "GET"});
const {data, status} = await useFetch("/api/market/getItem", {
  method: "GET",
  query: {id: route.params.id},
  key: `item${route.params.id}`,
});
interestUser.value = Boolean(
  data.value?.interested.find((user) => user.id === Number(uid))
);

//modal
const showEditModal = computed(() => route.query.modal === "edit");
const showCreateRoomModal = computed(() => route.query.modal === "createRoom");

const openCreateRoomModal = () => {
  router.push({query: {modal: "createRoom"}});
};
const closeModal = () => {
  router.push({query: {modal: undefined}});
};
// deletItem

//meta
useSeoMeta({
  title: () => data.value?.itemName + "",
  description: () => data.value?.itemDesc + "",
  ogTitle: () => data.value?.itemName + "",
  ogDescription: () => data.value?.itemDesc + "",
  ogImage: () => data.value?.itemImageUrl,
  ogUrl: () => `https://efd.netlify.app/market/${data.value?.id}`,
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
        <ItemBadge
          :complete="Boolean(data?.complete)"
          :item-sido="String(data?.itemSido)"
          :item-sigungu="String(data?.itemSigungu)"
          :item-road-adress="String(data?.itemRestAdress)"
        />
        <!-- Fn badges -->
        <ItemFnBadges
          :uid="String(uid)"
          :id="Number(data?.id)"
          :interest-user="interestUser"
          :sellerId="Number(data?.seller.id)"
          @emit-interest-user="(e:boolean) => (interestUser = e)"
        />
      </div>
      <!-- Item Info -->
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
            v-if="data?.seller.id !== uid"
            class="bg-indigo-900 hover:bg-warnYellow hover:text-indigo-900 rounded-md p-3 font-bold"
            @click.prevent="openCreateRoomModal"
          >
            구매문의하기
          </button>
        </div>
      </div>
    </div>
    <ClientOnly>
      <Teleport to="#defaultLayout">
        <div
          v-if="showEditModal || showCreateRoomModal"
          class="flex justify-center items-center"
        >
          <div
            @click.prevent="closeModal"
            class="fixed left-0 top-0 bg-black/50 size-full z-[99]"
          ></div>
          <EditProduct v-if="showEditModal" />
          <CreateRoomBtn
            v-if="showCreateRoomModal"
            :itemId="data?.id + ''"
            :itemName="data?.itemName"
            :sellerId="data?.seller.id"
            :token="data?.seller.alertToken + ''"
          />
        </div>
      </Teleport>
    </ClientOnly>
  </MarketLayer>
</template>
