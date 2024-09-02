<script setup lang="ts">
useHead({
  title: "Escpae From Danger | EFD",
  titleTemplate: "%s | EFD",
});
</script>
<template>
  <main class="h-dvh bg-darkBlue p-10">
    <div class="flex flex-col h-full mx-auto">
      <HeaderNav />
      <slot />
      <FooterNav />
    </div>
  </main>
</template>
