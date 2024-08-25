<script setup lang="ts">
import SharedText from "../shared/SharedText.vue";
</script>
<template>
  <nav class="flex justify-between items-center py-10">
    <SharedText tag="h3" txt="ESCAPE FORM DANGER" />
    <ul class="flex gap-10">
      <li>
        <SharedText tag="h5" txt="로그인" />
      </li>
      <li>
        <SharedText tag="h5" txt="회원가입" />
      </li>
    </ul>
  </nav>
</template>
