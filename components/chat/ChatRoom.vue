<script setup lang="ts">
import type {Chat} from "@prisma/client";

const {chats} = defineProps<{chats: Chat[]}>();
const uid = ref<number>();
onMounted(async () => {
  const myId = await $fetch("/api/auth/getUid");
  uid.value = myId;
});
// watch
</script>
<template>
  <li
    v-for="chat in chats"
    :key="chat.id"
    class="h-10 flex items-center"
    :class="chat.userId === uid ? 'self-end' : ''"
  >
    <span class="h-10 leading-10 px-3 rounded-lg bg-warnYellow text-darkBlue">{{
      chat.chat
    }}</span>
  </li>
</template>
