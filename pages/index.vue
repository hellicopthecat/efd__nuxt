<script setup lang="ts">
import Home from "~/components/home/Home.vue";
useSeoMeta({
  title: "Home",
  description: "대피소/안전행동요령/물물거래",
  ogTitle: "Home",
  ogDescription: "대피소/안전행동요령/물물거래",
  ogImage: "/pwaIcons/icon-512.png",
  ogUrl: "https://efd.netlify.app",
  twitterTitle: "Home",
  twitterDescription: "대피소/안전행동요령/물물거래",
  twitterImage: "/pwaIcons/icon-512.png",
  twitterCard: "app",
});
</script>
<template>
  <Home />
</template>
