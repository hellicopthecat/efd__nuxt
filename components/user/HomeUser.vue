<script setup lang="ts">
import SharedText from "../shared/SharedText.vue";
const {data} = useFetch("/api/auth/getUserInfo", {
  method: "get",
  key: "userInfo",
});
</script>
<template>
  <div
    class="self-start flex gap-5 items-center p-2 rounded-lg hover:bg-slate-500 hover:shadow-lg"
  >
    <NuxtLink
      v-if="!data?.avatarUrl"
      :href="`/profile/${data?.id}`"
      class="bg-blue-700 rounded-full overflow-hidden"
    >
      <Icon name="mdi:user" class="size-8" />
    </NuxtLink>
    <NuxtLink :href="`/profile/${data?.id}`">
      <SharedText tag="h4" :txt="data?.uid" />
    </NuxtLink>
  </div>
</template>
