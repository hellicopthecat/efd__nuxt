<script setup lang="ts">
import CivliDefenceNav from "~/components/behavior/CivliDefenceNav.vue";
import type {IBehaviorTypes} from "~/types/behavior/behaviorTypes";
const defaultDataId = ref("04001");
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
onMounted(async () => {
  await fetchData();
});
</script>
<template>
  <BehaviorLayout>
    <CivliDefenceNav @civil-defence="getDataId" />
    <BehaviorDataLayout :behavior="civilDefenceData" :head-title="4" />
  </BehaviorLayout>
</template>
