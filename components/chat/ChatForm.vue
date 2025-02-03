<script setup lang="ts">
import type {Chat} from "@prisma/client";
import {RealtimeChannel} from "@supabase/supabase-js";
interface IChatFormProps {
  channel: RealtimeChannel;
  roomId: String;
  chats: Chat[];
}
const {channel, roomId, chats} = defineProps<IChatFormProps>();
const inputMsg = ref("");
const onChangeInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  inputMsg.value = value;
};
const sendMsg = async (message: string) => {
  const uid = await $fetch("/api/auth/getUid", {method: "GET"});
  if (!channel) {
    alert("채널이 초기화되지 않았습니다.");
    return;
  }
  if (!message) {
    alert("내용을 입력해주세요");
    return;
  }
  const result = await $fetch("/api/chatting/chat", {
    method: "POST",
    body: {message, roomId},
  });
  if (result.ok) {
    await channel?.send({
      type: "broadcast",
      event: "send_message",
      payload: {
        id: result.id,
        createdAt: new Date(),
        updateAt: new Date(),
        chat: message,
        chatRoomId: roomId,
        userId: uid,
      },
    });

    chats.push({
      id: Number(result.id),
      createdAt: new Date(),
      updateAt: new Date(),
      chat: message,
      chatRoomId: roomId + "",
      userId: uid,
    });
  }
  inputMsg.value = "";
};
</script>
<template>
  <form
    class="self-end w-full flex items-center gap-5"
    @submit.prevent="sendMsg(inputMsg)"
  >
    <input
      type="text"
      placeholder="메세지를 입력하세요."
      class="w-full py-2 px-3 rounded-md text-darkBlue"
      @input="onChangeInput"
      :value="inputMsg"
    />
    <button
      @click.prevent="sendMsg(inputMsg)"
      class="bg-warnYellow flex justify-center items-center px-5 py-3 rounded-md"
    >
      <Icon name="mdi:send" class="text-darkBlue size-5" />
    </button>
  </form>
</template>
