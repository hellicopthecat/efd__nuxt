<script setup lang="ts">
import SharedText from "../shared/SharedText.vue";
const {data} = useFetch("/api/auth/getUserInfo", {
  method: "get",
  key: "userInfo",
});
</script>
<template>
  <NuxtLink
    :href="`/profile/${data?.id}`"
    class="self-start flex gap-5 items-center p-2 rounded-lg hover:bg-slate-500 hover:shadow-lg"
  >
    <div class="bg-blue-700 rounded-full overflow-hidden *:size-8">
      <Icon v-if="!data?.avatarUrl" name="mdi:user" />
      <NuxtImg v-if="data?.avatarUrl" :src="data.avatarUrl" />
    </div>
    <div>
      <SharedText tag="h4" :txt="data?.uid" />
    </div>
  </NuxtLink>
</template>
