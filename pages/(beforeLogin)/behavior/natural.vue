<script setup lang="ts">
import NaturalBehaviorNav from "~/components/behavior/NaturalBehaviorNav.vue";
import type {INaturalBehavior} from "~/types/behavior/behaviorTypes";

const naturalBehaviorData = ref<INaturalBehavior[]>([]);
const defaultDataId = ref("01001");

const fetchData = async () => {
  const result = await $fetch<INaturalBehavior[]>(
    "/api/behavior/natureDisaster",
    {
      method: "GET",
      params: {id: defaultDataId.value},
    }
  );
  naturalBehaviorData.value = result;
};

const getDataId = async (id: string) => {
  defaultDataId.value = id;
  fetchData();
};

onMounted(async () => {
  fetchData();
});
</script>
<template>
  <div class="p-10">
    <NaturalBehaviorNav @natural="getDataId" />
  </div>
</template>
