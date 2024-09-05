<script setup lang="ts">
useHead({
  title: "Escpae From Danger | EFD",
  titleTemplate: "%s | EFD",
});
</script>
<template>
  <main class="h-dvh bg-darkBlue overflow-hidden">
    <div class="flex flex-col h-full">
      <HeaderNav />
      <slot />
      <FooterNav />
    </div>
  </main>
</template>
