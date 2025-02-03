<script setup lang="ts">
interface IItemFnBadgesType {
  uid: string;
  id: number;
  interestUser: boolean;
  sellerId: number;
}
const {uid, id, interestUser, sellerId} = defineProps<IItemFnBadgesType>();
const emit = defineEmits(["emitInterestUser"]);
const pendingInterest = ref(false);
const router = useRouter();

const openEditModal = () => {
  router.push({query: {modal: "edit"}});
};
const interestedBtn = async () => {
  pendingInterest.value = true;
  const interest = await $fetch("/api/market/interest", {
    method: "POST",
    query: {uid: uid, itemID: id},
  });
  pendingInterest.value = false;
  emit("emitInterestUser", interest.interest);
};
const unInterestedBtn = async () => {
  pendingInterest.value = true;
  const uninterest = await $fetch("/api/market/uninterest", {
    method: "POST",
    query: {uid: uid, itemID: id},
  });
  pendingInterest.value = false;
  emit("emitInterestUser", uninterest.interest);
};
const deleteItem = async () => {
  const result = await $fetch("/api/market/deleteItem", {
    method: "POST",
    query: {id},
  });
  if (!result.ok) {
    alert((result.errMsg?.data as Error).message);
  } else {
    alert("삭제되었습니다.");
    router.push("/market");
  }
};
</script>
<template>
  <div class="flex self-end xl:self-start gap-3">
    <button
      v-if="Number(uid) === sellerId"
      @click.prevent="openEditModal"
      class="p-2 rounded-md bg-slate-700 hover:bg-slate-800"
    >
      <Icon name="mdi:pencil" class="size-8" />
    </button>
    <button
      v-if="Number(uid) === sellerId"
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
      <Icon v-if="!pendingInterest" name="mdi:star" class="size-8" />
      <Icon
        v-if="pendingInterest"
        name="mdi:loading"
        class="size-8 animate-spin"
      />
    </button>
    <button
      v-if="!interestUser"
      type="button"
      @click.prevent="interestedBtn"
      class="p-2 rounded-md bg-slate-700 hover:bg-slate-800"
    >
      <Icon v-if="!pendingInterest" name="mdi:star-outline" class="size-8" />
      <Icon
        v-if="pendingInterest"
        name="mdi:loading"
        class="size-8 animate-spin"
      />
    </button>
  </div>
</template>
