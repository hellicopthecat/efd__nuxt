<script setup lang="ts">
const {data} = useFetch("/api/chatting/getChatRoomList", {method: "GET"});
useSeoMeta({
  title: "채팅방",
  description: "채팅방 리스트",
  ogTitle: "채팅방",
  ogDescription: "채팅방리스트",
  ogImage: "/pwaIcons/icon-512.png",
  ogUrl: "https://efd.netlify.app/chatting",
  twitterTitle: "채팅방",
  twitterDescription: "채팅방리스트",
  twitterImage: "/pwaIcons/icon-512.png",
  twitterCard: "app",
});
</script>
<template>
  <div class="flex flex-col gap-5 p-5">
    <SharedText tag="h3" txt="채팅방" />
    <ul class="flex flex-col gap-5">
      <li
        v-for="room in data"
        :key="room.id"
        class="odd:bg-warnYellow even:bg-slate-600 odd:text-darkBlue even:text-warnYellow hover:odd:bg-yellow-600 hover:even:bg-slate-700 p-5 rounded-lg transition-all ease-in-out duration-500"
      >
        <NuxtLink :to="`/chatting/${room.id}`" class="flex gap-3">
          <div class="size-32 rounded-md overflow-hidden">
            <NuxtImg :src="room.Item?.itemImageUrl" class="size-32" />
          </div>
          <div class="flex flex-col gap-3">
            <SharedText tag="h3" :txt="room.Item?.itemName" class-name="" />
            <SharedText
              tag="p"
              :txt="room.chat[room.chat.length - 1].chat"
              class-name=""
            />
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
