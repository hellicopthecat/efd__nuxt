<script setup lang="ts">
const links = [
  [
    {
      label: "HOME",
      icon: "i-heroicons-solid:home",
      to: "/",
    },
  ],
];
</script>
<template>
  <UHorizontalNavigation :links="links" class="justify-center h-40 z-50" />
</template>
