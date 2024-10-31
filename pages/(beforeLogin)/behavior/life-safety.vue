<script setup lang="ts">
import BehaviorDataLayout from "~/components/behavior/BehaviorDataLayout.vue";
import BehaviorLayout from "~/components/behavior/BehaviorLayout.vue";
import LifeSafetyNav from "~/components/behavior/LifeSafetyNav.vue";
import type {IBehaviorTypes} from "~/types/behavior/behaviorTypes";

const lifeSafetyData = ref<IBehaviorTypes[] | null>(null);
const defaultDataId = ref("03002");

const fetchData = async () => {
  const result = await $fetch("/api/behavior/lifeSafety", {
    method: "GET",
    query: {id: defaultDataId.value},
  });
  lifeSafetyData.value = result;
  console.log(lifeSafetyData.value);
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
    <LifeSafetyNav @lifeSafety="getDataId" />
    <BehaviorDataLayout :behavior="lifeSafetyData" :headTitle="3" />
  </BehaviorLayout>
</template>
