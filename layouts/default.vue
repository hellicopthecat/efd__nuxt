<script setup lang="ts">
import DisasterMsg from "~/components/disasterMsg/DisasterMsg.vue";
import FooterNav from "~/components/footer/FooterNav.vue";
useHead({
  title: "Escpae From Danger",
  titleTemplate: "%s | EFD",
});
</script>
<template>
  <div
    id="defaultLayout"
    class="flex flex-col xl:flex-row w-full h-full bg-darkBlue text-warnYellow"
  >
    <HeaderNav />
    <main class="relative flex flex-col w-full h-full overflow-x-hidden">
      <slot />
      <DisasterMsg />
      <FooterNav />
    </main>
  </div>
</template>
