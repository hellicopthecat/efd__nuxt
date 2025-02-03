<script setup lang="ts">
const clickGoogleLogin = () =>
  (window.location.href = "/api/auth/social/googleLogin");
</script>
<template>
  <div
    class="*:bg-white *:flex *:justify-center *:items-center *:p-2 *:rounded-full *:shadow-sm"
  >
    <button @click.prevent="clickGoogleLogin">
      <Icon name="logos:google-icon" class="size-10" />
    </button>
  </div>
</template>
