<script setup lang="ts">
import SharedText from "../shared/SharedText.vue";

const router = useRouter();
const auth = useAuth();

const logoutHandler = async () => {
  auth.value = false;
  await $fetch("/api/auth/logout", {method: "POST"});
  router.push("/");
};
</script>
<template>
  <nav
    class="relative z-50 flex justify-between items-center text-warnYellow p-10 bg-transparent"
  >
    <NuxtLink to="/">
      <SharedText tag="h3" txt="ESCAPE FORM DANGER" />
    </NuxtLink>

    <ul class="flex gap-10">
      <li v-if="!auth">
        <NuxtLink to="/login">
          <SharedText tag="h5" txt="로그인" />
        </NuxtLink>
      </li>
      <li v-if="!auth">
        <NuxtLink to="/join">
          <SharedText tag="h5" txt="회원가입" />
        </NuxtLink>
      </li>
      <li v-if="auth">
        <button @click="logoutHandler">
          <SharedText tag="h5" txt="로그아웃" />
        </button>
      </li>
    </ul>
  </nav>
</template>
