<script setup lang="ts">
import AuthLayout from "~/components/auth/AuthLayout.vue";
useHead({title: "회원가입"});
</script>
<template>
  <AuthLayout>
    <div
      class="flex flex-col justify-between bg-white/10 rounded-lg border border-white/25 h-full w-[40%] p-10"
    >
      <form
        action="/api/login/login"
        method="post"
        class="flex flex-col justify-center gap-5 h-full"
      >
        <legend class="mx-auto"><SharedText tag="h2" txt="회원가입" /></legend>
        <SharedInput
          label-txt="아이디"
          name="uid"
          type="text"
          placeholder="아이디"
        />
        <SharedInput
          label-txt="이메일"
          name="email"
          type="text"
          placeholder="이메일"
        />
        <SharedInput
          label-txt="비밀번호"
          name="password"
          type="text"
          placeholder="비밀번호"
        />
        <SharedInput
          label-txt="비밀번호 확인"
          name="passwordCheck"
          type="text"
          placeholder="비밀번호 확인"
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
  </AuthLayout>
</template>
