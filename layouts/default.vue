<script setup lang="ts">
import DisasterMsg from "~/components/disasterMsg/DisasterMsg.vue";
useHead({
  title: "Escpae From Danger",
  titleTemplate: "%s | EFD",
});
</script>
<template>
  <div
    id="defaultLayout"
    class="flex w-full h-full bg-darkBlue text-warnYellow"
  >
    <HeaderNav />
    <main class="flex flex-col w-full h-full overflow-x-hidden">
      <DisasterMsg />
      <slot />
    </main>
    <!-- <FooterNav /> -->
  </div>
</template>
