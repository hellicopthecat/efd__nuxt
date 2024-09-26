<script setup lang="ts">
interface ISharedLayoutProps {
  className?: string;
}
defineProps<ISharedLayoutProps>();
</script>
<template>
  <section :class="`flex flex-col h-full ${className}`">
    <slot />
  </section>
</template>
