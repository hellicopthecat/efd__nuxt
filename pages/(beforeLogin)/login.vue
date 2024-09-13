<script setup lang="ts">
import AuthLayout from "~/components/auth/AuthLayout.vue";
import SharedText from "~/components/shared/SharedText.vue";

useHead({title: "로그인"});

const router = useRouter();
const auth = useAuth();
const formData = ref({
  uid: "",
  password: "",
});
const errMsg = ref("");
const submitLogin = async () => {
  const {data, error} = await useAsyncData("login", () =>
    $fetch("/api/auth/login", {
      method: "POST",
      body: {
        uid: formData.value.uid,
        password: formData.value.password,
      },
    })
  );
  if (data.value && data.value.success) {
    auth.value = true;
    return router.push("/");
  }
  if (error.value) {
    errMsg.value = error.value.message;
  }
};
</script>
<template>
  <AuthLayout>
    <div
      class="flex flex-col justify-between bg-white/10 rounded-lg border border-white/25 h-full w-[40%] p-10"
    >
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
          type="text"
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
  </AuthLayout>
</template>
