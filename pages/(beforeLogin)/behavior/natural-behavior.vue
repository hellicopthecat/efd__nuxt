<script setup lang="ts">
import BehaviorDataLayout from "~/components/behavior/BehaviorDataLayout.vue";
import BehaviorLayout from "~/components/behavior/BehaviorLayout.vue";
import NaturalBehaviorNav from "~/components/behavior/NaturalBehaviorNav.vue";
import type {IBehaviorTypes} from "~/types/behavior/behaviorTypes";

const naturalBehaviorData = ref<IBehaviorTypes[] | null>(null);
const defaultDataId = ref("01001");
const defaultHeadText = ref("태풍");
const fetchData = async () => {
  const result = await $fetch<IBehaviorTypes[]>(
    "/api/behavior/naturalDisaster",
    {
      method: "GET",
      params: {id: defaultDataId.value},
    }
  );
  naturalBehaviorData.value = result;
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
  description: () => `${defaultHeadText.value} (자연재난)`,
  ogTitle: () => defaultHeadText.value,
  ogDescription: () => `${defaultHeadText.value} (자연재난)`,
  twitterTitle: () => defaultHeadText.value,
  twitterDescription: () => `${defaultHeadText.value} (자연재난)`,
  twitterCard: "app",
});
</script>
<template>
  <BehaviorLayout>
    <NaturalBehaviorNav @natural="getDataId" @get-head-text="getHeadText" />
    <BehaviorDataLayout :behavior="naturalBehaviorData" :head-title="1" />
  </BehaviorLayout>
</template>
