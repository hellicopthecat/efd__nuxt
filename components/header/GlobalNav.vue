<script setup lang="ts">
import SharedText from "../shared/SharedText.vue";
import {ACCESSTOKEN} from "~/utils/constants/constants";
const {open, userId} = defineProps({open: Boolean, userId: String});
const route = useRoute();
</script>
<template>
  <nav
    class="w-full transition-all duration-300 ease-in-out origin-top"
    :class="open ? 'scale-0 h-0' : 'scale-100'"
  >
    <ul
      class="flex justify-between xl:flex-col xl:justify-start gap-1 *:p-2 *:rounded-md hover:*:bg-slate-500 hover:*:shadow-lg"
    >
      <li :class="route.path === '/' && 'bg-slate-500'">
        <NuxtLink
          to="/"
          class="flex flex-col xl:flex-row justify-between items-center"
          title="홈"
        >
          <Icon name="fa6-solid:house" class="size-6" />
          <SharedText tag="h5" txt="홈" class-name="hidden xl:block" />
        </NuxtLink>
      </li>
      <li :class="route.path === '/weather' && 'bg-slate-500'">
        <NuxtLink
          to="/weather"
          class="flex flex-col xl:flex-row justify-between items-center"
          title="날씨"
        >
          <Icon name="fa6-solid:cloud-sun-rain" class="size-6" />
          <SharedText tag="h5" txt="날씨" class-name="hidden xl:block" />
        </NuxtLink>
      </li>
      <li :class="route.path === '/weatherSpecial' && 'bg-slate-500'">
        <NuxtLink
          to="/weatherSpecial"
          class="flex flex-col xl:flex-row justify-between items-center"
          title="기상특보"
        >
          <Icon name="mdi:chat-alert" class="size-6" />
          <SharedText tag="h5" txt="기상특보" class-name="hidden xl:block" />
        </NuxtLink>
      </li>
      <li :class="route.path === '/behavior' && 'bg-slate-500'">
        <NuxtLink
          to="/behavior"
          class="flex flex-col xl:flex-row justify-between items-center"
          title="재난시 행동요령"
        >
          <Icon name="mdi:exit-run" class="size-6" />
          <SharedText
            tag="h5"
            txt="재난시 행동요령"
            class-name="hidden xl:block"
          />
        </NuxtLink>
      </li>
      <li :class="route.path === '/disasterbag' && 'bg-slate-500'">
        <NuxtLink
          to="/disasterbag"
          class="flex flex-col xl:flex-row justify-between items-center"
          title="재난구호대비"
        >
          <Icon name="icon-park-solid:backpack" class="size-6" />
          <SharedText
            tag="h5"
            txt="재난구호대비"
            class-name="hidden xl:block"
          />
        </NuxtLink>
      </li>
      <li v-if="userId" :class="route.path === '/market' && 'bg-slate-500'">
        <NuxtLink
          to="/market"
          class="flex flex-col xl:flex-row justify-between items-center"
          title="돕고돕기"
        >
          <Icon name="icon-park-twotone:weixin-market" class="size-6" />
          <SharedText tag="h5" txt="돕고돕기" class-name="hidden xl:block" />
        </NuxtLink>
      </li>
      <li v-if="userId" :class="route.path === '/chatting' && 'bg-slate-500'">
        <NuxtLink
          to="/chatting"
          class="flex flex-col xl:flex-row justify-between items-center"
          title="채팅방"
        >
          <Icon name="mdi:chat" class="size-6" />
          <SharedText tag="h5" txt="채팅방" class-name="hidden xl:block" />
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
