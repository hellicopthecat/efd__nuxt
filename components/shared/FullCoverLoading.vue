<script setup lang="ts">
import LoadingIndicator from "./LoadingIndicator.vue";
const {loading} = defineProps({loading: Boolean});
</script>

<template>
  <ClientOnly>
    <Teleport v-if="loading" to="#teleports">
      <div
        class="fixed bg-black/60 left-0 top-0 size-full z-[99] flex items-center justify-center"
      >
        <LoadingIndicator />
      </div>
    </Teleport>
  </ClientOnly>
</template>
