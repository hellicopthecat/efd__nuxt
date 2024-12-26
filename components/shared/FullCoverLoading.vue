<script setup lang="ts">
import LoadingIndicator from "./LoadingIndicator.vue";
const {loading} = defineProps({loading: Boolean});
</script>

<template>
  <Teleport v-if="loading" to="#defaultLayout">
    <ClientOnly>
      <div
        class="fixed bg-black/60 left-0 top-0 size-full z-[99] flex items-center justify-center"
      >
        <LoadingIndicator />
      </div>
    </ClientOnly>
  </Teleport>
</template>
