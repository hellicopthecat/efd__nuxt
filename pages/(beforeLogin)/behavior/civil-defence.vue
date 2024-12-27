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
watch(defaultHeadText, () => {
  useHead({title: defaultHeadText.value});
});
useHead({title: defaultHeadText.value});
</script>
<template>
  <BehaviorLayout>
    <CivliDefenceNav @civil-defence="getDataId" @get-head-text="getHeadText" />
    <BehaviorDataLayout :behavior="civilDefenceData" :head-title="4" />
  </BehaviorLayout>
</template>
