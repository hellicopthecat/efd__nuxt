<script setup lang="ts">
import BehaviorDataLayout from "~/components/behavior/BehaviorDataLayout.vue";
import BehaviorLayout from "~/components/behavior/BehaviorLayout.vue";
import SocialBehaviorNav from "~/components/behavior/SocialBehaviorNav.vue";
import type {IBehaviorTypes} from "~/types/behavior/behaviorTypes";

const socialBehaviorData = ref<IBehaviorTypes[] | null>(null);
const defaultDataId = ref("02001");
const defaultHeadText = ref("해양오염사고");
const fetchData = async () => {
  const result = await $fetch<IBehaviorTypes[]>(
    "/api/behavior/socialDIsaster",
    {
      method: "GET",
      query: {id: defaultDataId.value},
    }
  );
  socialBehaviorData.value = result;
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
    <SocialBehaviorNav @social="getDataId" @get-head-text="getHeadText" />
    <BehaviorDataLayout :behavior="socialBehaviorData" :head-title="2" />
  </BehaviorLayout>
</template>
