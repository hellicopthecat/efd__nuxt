<script setup lang="ts">
import BehaviorDataLayout from "~/components/behavior/BehaviorDataLayout.vue";
import BehaviorLayout from "~/components/behavior/BehaviorLayout.vue";
import SocialBehaviorNav from "~/components/behavior/SocialBehaviorNav.vue";
import type {IBehaviorTypes} from "~/types/behavior/behaviorTypes";

const socialBehaviorData = ref<IBehaviorTypes[] | null>(null);
const defaultDataId = ref("02001");
const defaultHeadText = ref("해양오염사고");

const getSocialData = async () => {
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
  await getSocialData();
};

const getHeadText = (txt: string) => (defaultHeadText.value = txt);

onMounted(async () => {
  await getSocialData();
});
useSeoMeta({
  title: () => defaultHeadText.value,
  description: () => `${defaultHeadText.value} (사회재난)`,
  ogTitle: () => defaultHeadText.value,
  ogDescription: () => `${defaultHeadText.value} (사회재난)`,
  twitterTitle: () => defaultHeadText.value,
  twitterDescription: () => `${defaultHeadText.value} (사회재난)`,
  twitterCard: "app",
});
</script>
<template>
  <BehaviorLayout>
    <SocialBehaviorNav @social="getDataId" @get-head-text="getHeadText" />
    <BehaviorDataLayout :behavior="socialBehaviorData" :head-title="2" />
  </BehaviorLayout>
</template>
