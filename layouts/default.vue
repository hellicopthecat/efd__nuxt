<script setup lang="ts">
useHead({
  title: "Escpae From Danger | EFD",
  titleTemplate: "%s | EFD",
});
</script>
<template>
  <div class="flex flex-col bg-darkBlue h-full">
    <HeaderNav />
    <main class="flex flex-col h-full">
      <slot />
    </main>
    <FooterNav />
  </div>
</template>
