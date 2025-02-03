<script setup lang="ts">
import BehaviorDataLayout from "~/components/behavior/BehaviorDataLayout.vue";
import BehaviorLayout from "~/components/behavior/BehaviorLayout.vue";
import LifeSafetyNav from "~/components/behavior/LifeSafetyNav.vue";
import type {IBehaviorTypes} from "~/types/behavior/behaviorTypes";

const lifeSafetyData = ref<IBehaviorTypes[] | null>(null);
const defaultDataId = ref("03002");
const defaultHeadText = ref("응급처치");
const fetchData = async () => {
  const result = await $fetch("/api/behavior/lifeSafety", {
    method: "GET",
    query: {id: defaultDataId.value},
  });
  lifeSafetyData.value = result;
};

const getDataId = async (id: string) => {
  defaultDataId.value = id;
  await fetchData();
};
const getHeadText = (txt: string) => {
  defaultHeadText.value = txt;
};
onMounted(async () => {
  await fetchData();
});
useSeoMeta({
  title: () => defaultHeadText.value,
  description: () => `${defaultHeadText.value} (생활안전)`,
  ogTitle: () => defaultHeadText.value,
  ogDescription: () => `${defaultHeadText.value} (생활안전)`,
  ogImage: "/pwaIcons/icon-512.png",
  ogUrl: "https://efd.netlify.app/life-safety",
  twitterTitle: () => defaultHeadText.value,
  twitterDescription: () => `${defaultHeadText.value} (생활안전)`,
  twitterImage: "/pwaIcons/icon-512.png",
  twitterCard: "app",
});
</script>
<template>
  <BehaviorLayout>
    <LifeSafetyNav @lifeSafety="getDataId" @get-head-text="getHeadText" />
    <BehaviorDataLayout :behavior="lifeSafetyData" :headTitle="3" />
  </BehaviorLayout>
</template>
