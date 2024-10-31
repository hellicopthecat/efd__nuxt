<script setup lang="ts">
import BehaviorDataLayout from "~/components/behavior/BehaviorDataLayout.vue";
import BehaviorLayout from "~/components/behavior/BehaviorLayout.vue";
import SocialBehaviorNav from "~/components/behavior/SocialBehaviorNav.vue";
import type {IBehaviorTypes} from "~/types/behavior/behaviorTypes";

const socialBehaviorData = ref<IBehaviorTypes[] | null>(null);
const defaultDataId = ref("02001");

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

onMounted(async () => {
  await fetchData();
});
</script>
<template>
  <BehaviorLayout>
    <SocialBehaviorNav @social="getDataId" />
    <BehaviorDataLayout :behavior="socialBehaviorData" :head-title="2" />
  </BehaviorLayout>
</template>
