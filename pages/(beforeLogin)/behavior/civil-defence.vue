<script setup lang="ts">
import CivliDefenceNav from "~/components/behavior/CivliDefenceNav.vue";
import type {IBehaviorTypes} from "~/types/behavior/behaviorTypes";
const defaultDataId = ref("04001");
const defaultHeadText = ref("비상사태");
const civilDefenceData = ref<IBehaviorTypes[] | null>(null);
const fetchData = async () => {
  const result = await $fetch<IBehaviorTypes[]>("/api/behavior/civliDefence", {
    method: "GET",
    query: {id: defaultDataId.value},
  });
  civilDefenceData.value = result;
};
const getDataId = async (id: string) => {
  defaultDataId.value = id;
  await fetchData();
};
const getHeadText = (txt: string) => (defaultHeadText.value = txt);
onMounted(async () => {
  await fetchData();
});
useSeoMeta({
  title: () => defaultHeadText.value,
  description: () => `${defaultHeadText.value} (민방위)`,
  ogTitle: () => defaultHeadText.value,
  ogDescription: () => `${defaultHeadText.value} (민방위)`,
  ogImage: "/pwaIcons/icon-512.png",
  ogUrl: "/civil-defence",
  twitterTitle: () => defaultHeadText.value,
  twitterDescription: () => `${defaultHeadText.value} (민방위)`,
  twitterImage: "/pwaIcons/icon-512.png",
  twitterCard: "app",
});
</script>
<template>
  <BehaviorLayout>
    <CivliDefenceNav @civil-defence="getDataId" @get-head-text="getHeadText" />
    <BehaviorDataLayout :behavior="civilDefenceData" :head-title="4" />
  </BehaviorLayout>
</template>
