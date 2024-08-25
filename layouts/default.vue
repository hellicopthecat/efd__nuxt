<script setup lang="ts">
useHead({
  title: "Escpae From Danger | EFD",
  titleTemplate: "%s | EFD",
});
</script>
<template>
  <main class="h-dvh bg-darkBlue">
    <UContainer class="flex flex-col h-full">
      <HeaderNav />
      <slot />
      <FooterNav />
    </UContainer>
  </main>
</template>
