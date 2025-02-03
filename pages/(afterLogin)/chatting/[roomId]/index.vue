<script setup lang="ts">
import type {Chat} from "@prisma/client";
import type {
  REALTIME_LISTEN_TYPES,
  RealtimeChannel,
} from "@supabase/supabase-js";
import type {GetChatRoomType} from "~/server/api/chatting/getChatRoom.get";
interface IReceivedMsg {
  payload: Chat;
  type: `${REALTIME_LISTEN_TYPES.BROADCAST}`;
  event: string;
}
const {$initSupabase} = useNuxtApp();
const route = useRoute();
const chats = ref<Chat[]>([]);
const channelRef = ref<RealtimeChannel>();
const {data, error} = useFetch<GetChatRoomType>("/api/chatting/getChatRoom", {
  method: "get",
  query: {roomId: route.params.roomId},
});

const messageReceived = (payload: IReceivedMsg["payload"]) => {
  return (chats.value = [...chats.value, payload]);
};

onMounted(() => {
  if (data.value) {
    const channel = $initSupabase.channel(`room:${data.value.id}`);
    channel
      ?.on("broadcast", {event: "send_message"}, (payload: IReceivedMsg) => {
        messageReceived(payload.payload);
      })
      .subscribe();
    chats.value = data.value.chat;
    channelRef.value = channel;
  }
  if (error.value?.message) {
    alert(error.value.message);
    return navigateTo("/chatting");
  }
});

onUnmounted(async () => {
  await channelRef.value?.unsubscribe();
});
</script>
<template>
  <div class="flex flex-col h-full p-5 gap-5">
    <ul class="flex flex-col gap-5 w-full h-full overflow-y-scroll p-3">
      <ChatRoom v-if="data" :chats="chats" />
    </ul>
    <ChatForm
      :channel="channelRef!"
      :room-id="route.params.roomId + ''"
      :chats="chats"
    />
  </div>
</template>
