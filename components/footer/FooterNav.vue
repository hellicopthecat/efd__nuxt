<script setup lang="ts">
import SharedText from "../shared/SharedText.vue";
</script>
<template>
  <div class="fixed z-[70] bottom-2 right-10">
    <SharedText
      tag="small"
      :txt="`&copy; Hellicat ${new Date().getFullYear()}.`"
      class-name="text-emerald-400"
    />
  </div>
</template>
