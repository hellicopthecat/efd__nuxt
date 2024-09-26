<script setup lang="ts">
useHead({title: "회원가입"});
definePageMeta({
  layout: "auth-layout",
});
const router = useRouter();
const formData = ref({
  uid: "",
  name: "",
  email: "",
  password: "",
  checkPass: "",
});
const errorMsg = ref("");
const submitJoin = async () => {
  const {data, error} = await useAsyncData("join", () =>
    $fetch("/api/auth/join", {method: "POST", body: formData.value})
  );
  if (error.value && error.value.data) {
    const err = error.value.data as Error;
    errorMsg.value = err.message;
  }
  if (data.value && data.value.success) {
    router.push("/");
  }
};
const handleErrOffClick = () => {
  errorMsg.value = "";
  clearError();
};
</script>
<template>
  <div
    class="flex flex-col justify-between bg-white/10 rounded-lg border border-white/25 h-full w-[40%] p-10"
  >
    <div v-if="errorMsg">
      <h1>
        {{ errorMsg }}
      </h1>
      <button @click="handleErrOffClick">확인</button>
    </div>
    <form
      @submit.prevent="submitJoin"
      method="post"
      class="flex flex-col justify-center gap-5 h-full"
    >
      <legend class="mx-auto"><SharedText tag="h2" txt="회원가입" /></legend>
      <SharedInput
        label-txt="아이디"
        name="uid"
        type="text"
        placeholder="아이디"
        :value="formData.uid"
        @update:value="formData.uid = $event"
      />
      <SharedInput
        label-txt="이름"
        name="name"
        type="text"
        placeholder="이름"
        :value="formData.name"
        @update:value="formData.name = $event"
      />
      <SharedInput
        label-txt="이메일"
        name="email"
        type="text"
        placeholder="이메일"
        :value="formData.email"
        @update:value="formData.email = $event"
      />
      <SharedInput
        label-txt="비밀번호"
        name="password"
        type="text"
        placeholder="비밀번호"
        :value="formData.password"
        @update:value="formData.password = $event"
      />
      <SharedInput
        label-txt="비밀번호 확인"
        name="checkPass"
        type="text"
        placeholder="비밀번호 확인"
        :value="formData.checkPass"
        @update:value="formData.checkPass = $event"
      />

      <button type="submit" class="bg-warnYellow h-10 rounded-lg text-black">
        회원가입
      </button>
    </form>
    <div class="flex justify-center">
      <p class="flex gap-5">
        이미 회원이신가요?
        <NuxtLink href="/login" class="text-warnYellow"> 로그인 </NuxtLink>
      </p>
    </div>
  </div>
</template>
