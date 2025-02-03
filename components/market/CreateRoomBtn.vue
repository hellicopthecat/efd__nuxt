<script setup lang="ts">
import SharedText from "../shared/SharedText.vue";
import MarketModalLayout from "./layouts/MarketModalLayout.vue";
const {itemId, itemName, sellerId, token} = defineProps({
  itemId: String,
  itemName: String,
  sellerId: Number,
  token: String,
});
const router = useRouter();
const closeModal = () => router.push({query: {modal: undefined}});
const createRoom = async () => {
  const result = await $fetch("/api/chatting/createRoom", {
    method: "POST",
    query: {
      itemId,
      itemName,
      sellerId,
      token,
    },
  });
  if (result?.ok) {
    return navigateTo(`/chatting/${result.roomId}`);
  } else {
    // alert(result.errMsg);
    return;
  }
};
</script>

<template>
  <MarketModalLayout :height="'40%'">
    <div class="flex flex-col gap-5 items-center w-full h-full">
      <SharedText tag="h3" txt="상품문의를 하시겠습니까?" />
      <div
        class="flex justify-around gap-5 w-full *:transition-all *:ease-in-out *:duration-300"
      >
        <button
          @click.prevent="createRoom"
          class="w-full bg-green-600 py-2 rounded-lg hover:bg-green-700"
        >
          확인
        </button>
        <button
          @click.prevent="closeModal"
          class="w-full bg-slate-500 py-2 rounded-lg hover:bg-slate-600"
        >
          취소
        </button>
      </div>
    </div>
  </MarketModalLayout>
</template>
