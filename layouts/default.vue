<script setup lang="ts">
import DisasterMsg from "~/components/disasterMsg/DisasterMsg.vue";

useHead({
  title: "Escpae From Danger | EFD",
  titleTemplate: "%s | EFD",
});
</script>
<template>
  <div class="flex w-full h-full bg-darkBlue text-warnYellow">
    <HeaderNav />
    <main class="w-full h-full overflow-x-hidden">
      <DisasterMsg />
      <slot />
    </main>
    <!-- <FooterNav /> -->
  </div>
</template>
