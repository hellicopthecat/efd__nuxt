<script setup lang="ts">
interface IErrMsgBtn {
  errMsg: string;
}
const {errMsg} = defineProps<IErrMsgBtn>();
const emit = defineEmits(["clearErrMsg"]);
const handleErrOffClick = () => {
  emit("clearErrMsg");
  clearError();
};
</script>
<template>
  <div
    class="flex justify-between items-center bg-red-700 px-5 py-2 rounded-lg"
  >
    <SharedText tag="h6" :txt="errMsg" />
    <button
      @click="() => handleErrOffClick()"
      class="rounded-lg hover:bg-pink-800 px-3 py-2 ring-1 ring-red-200"
    >
      닫기
    </button>
  </div>
</template>
