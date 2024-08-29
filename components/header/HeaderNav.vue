<script setup lang="ts">
import SharedText from "../shared/SharedText.vue";
</script>
<template>
  <nav class="flex justify-between items-center py-10 text-warnYellow">
    <NuxtLink to="/">
      <SharedText tag="h3" txt="ESCAPE FORM DANGER" />
    </NuxtLink>
    <ul class="flex gap-10">
      <li>
        <NuxtLink to="/login">
          <SharedText tag="h5" txt="로그인" />
        </NuxtLink>
      </li>
      <li>
        <SharedText tag="h5" txt="회원가입" />
      </li>
    </ul>
  </nav>
</template>
