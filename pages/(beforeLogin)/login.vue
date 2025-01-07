<script setup lang="ts">
import ClearErrBtn from "~/components/auth/ClearErrBtn.vue";
import SharedText from "~/components/shared/SharedText.vue";

definePageMeta({
  layout: "auth-layout",
});

useSeoMeta({
  title: "로그인",
  description: "로그인(LogIn)",
  ogTitle: "로그인",
  ogDescription: "로그인(LogIn)",
  ogImage: "/pwaIcons/icon-512.png",
  ogUrl: "/login",
  twitterTitle: "로그인",
  twitterDescription: "로그인(LogIn)",
  twitterImage: "/pwaIcons/icon-512.png",
  twitterCard: "app",
});
const formData = ref({
  uid: "",
  password: "",
});
const errMsg = ref<string | undefined | null>("");
const submitLogin = async () => {
  const {data, error} = await useFetch("/api/auth/login", {
    method: "POST",
    body: {
      uid: formData.value.uid,
      password: formData.value.password,
    },
  });

  if (data.value && data.value.ok) {
    navigateTo("/");
  }
  if (error.value) {
    const err = error.value.data as Error;
    errMsg.value = err.message;
  }
};
const clearErrMsg = () => (errMsg.value = "");
</script>
<template>
  <div
    class="flex flex-col justify-between bg-white/10 rounded-lg border border-white/25 h-full xl:w-[40%] p-10"
  >
    <ClearErrBtn v-if="errMsg" :err-msg="errMsg" @clear-err-msg="clearErrMsg" />

    <form
      @submit.prevent="submitLogin"
      method="post"
      class="flex flex-col justify-center gap-5 h-full"
    >
      <legend class="mx-auto"><SharedText tag="h2" txt="로그인" /></legend>
      <SharedInput
        label-txt="아이디"
        name="uid"
        type="text"
        placeholder="아이디"
        :value="formData.uid"
        @update:value="formData.uid = $event"
      />
      <SharedInput
        label-txt="비밀번호"
        name="password"
        type="password"
        placeholder="비밀번호"
        :value="formData.password"
        @update:value="formData.password = $event"
      />

      <button type="submit" class="bg-warnYellow h-10 rounded-lg text-black">
        로그인
      </button>
      <div class="relative flex items-center justify-center">
        <div class="w-full border border-white/50" />
        <SharedText tag="span" txt="OR" class-name="px-10 text-white/50" />
        <div class="w-full border border-white/50" />
      </div>
    </form>
    <div class="flex justify-center">
      <p class="flex gap-5">
        아직 회원이 아니신가요?
        <NuxtLink href="/join" class="text-warnYellow"> 회원가입 </NuxtLink>
      </p>
    </div>
  </div>
</template>
