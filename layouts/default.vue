<script setup lang="ts">
useHead({
  title: "Escpae From Danger | EFD",
  titleTemplate: "%s | EFD",
});
</script>
<template>
  <div class="flex w-full h-full bg-darkBlue text-warnYellow">
    <HeaderNav />
    <main class="w-full h-full overflow-x-hidden">
      <slot />
    </main>
    <!-- <FooterNav /> -->
  </div>
</template>
