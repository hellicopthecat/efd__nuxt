<script setup lang="ts">
interface ISharedLayoutProps {
  className?: string;
}
defineProps<ISharedLayoutProps>();
</script>
<template>
  <section :class="`flex flex-col ${className} h-full`">
    <slot />
  </section>
</template>
