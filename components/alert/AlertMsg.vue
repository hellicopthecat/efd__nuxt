<script lang="ts" setup>
const router = useRouter();
const alertData = useNewAlert();
const show = ref(false);
const goToChatRoom = () => {
  show.value = false;
  router.push(`/chatting/${alertData.value?.roomId}`);
  setTimeout(() => {
    alertData.value = null;
  }, 300);
};
const closeAlert = () => {
  show.value = false;
  setTimeout(() => {
    alertData.value = null;
  }, 300);
};
watch(alertData, () => {
  alertData.value ? (show.value = true) : (show.value = false);
});
</script>
<template>
  <div
    class="absolute z-[99] flex items-center gap-5 self-center text-darkBlue bg-warnYellow px-5 py-3 rounded-md transition-all ease-in-out duration-500"
    :class="show ? 'top-5' : '-top-96'"
  >
    <span>{{ alertData?.desc }}</span>

    <div class="flex gap-3">
      <button
        v-if="alertData?.roomId"
        @click="goToChatRoom"
        class="p-2 rounded-md shadow-md hover:bg-yellow-500"
      >
        채팅방
      </button>
      <button
        @click="closeAlert"
        class="p-2 rounded-md shadow-md hover:bg-gray-300"
      >
        닫기
      </button>
    </div>
  </div>
</template>
