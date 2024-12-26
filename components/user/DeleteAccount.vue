<script setup lang="ts">
import FullCoverLoading from "../shared/FullCoverLoading.vue";
import SharedText from "../shared/SharedText.vue";
const btnPending = ref(false);
const deleteAccount = async () => {
  const confirmOk = confirm("정말로 회원탈퇴하시겠습니까?");
  if (confirmOk) {
    btnPending.value = true;
    const {data, error} = await useFetch("/api/auth/deleteAccount", {
      method: "POST",
    });
    if (data.value?.ok) {
      alert("회원탈퇴가 완료되었습니다.");
      btnPending.value = false;
      navigateTo("/");
    } else {
      const err = error.value?.data as Error;
      alert(err.message);
      btnPending.value = false;
    }
  } else {
    return;
  }
};
</script>

<template>
  <button @click="deleteAccount" class="flex flex-col gap-5">
    <SharedText tag="h4" txt="회원탈퇴" className="text-red-500" />
  </button>
  <FullCoverLoading :loading="btnPending" />
</template>
