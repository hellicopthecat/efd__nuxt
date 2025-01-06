<script setup lang="ts">
import {ACCESSTOKEN} from "~/utils/constants/constants";
import SharedText from "../shared/SharedText.vue";
const {open} = defineProps({open: Boolean});
const accessToken = useCookie(ACCESSTOKEN);
</script>
<template>
  <nav
    class="w-full transition-all duration-300 ease-in-out origin-top"
    :class="open ? 'scale-0 h-0' : 'scale-100'"
  >
    <ul
      class="flex justify-between xl:flex-col xl:justify-start gap-1 *:p-2 *:rounded-md hover:*:bg-slate-500 hover:*:shadow-lg"
    >
      <li>
        <NuxtLink
          to="/"
          class="flex flex-col xl:flex-row justify-between items-center"
          title="홈"
        >
          <Icon name="fa6-solid:house" class="size-6" />
          <SharedText tag="h5" txt="홈" class-name="hidden xl:block" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/weather"
          class="flex flex-col xl:flex-row justify-between items-center"
          title="날씨"
        >
          <Icon name="fa6-solid:cloud-sun-rain" class="size-6" />
          <SharedText tag="h5" txt="날씨" class-name="hidden xl:block" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/weatherSpecial"
          class="flex flex-col xl:flex-row justify-between items-center"
          title="기상특보"
        >
          <Icon name="mdi:chat-alert" class="size-6" />
          <SharedText tag="h5" txt="기상특보" class-name="hidden xl:block" />
        </NuxtLink>
      </li>
      <li>
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
      <li>
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
      <li v-if="accessToken">
        <NuxtLink
          to="/market"
          class="flex flex-col xl:flex-row justify-between items-center"
          title="돕고돕기"
        >
          <Icon name="icon-park-twotone:weixin-market" class="size-6" />
          <SharedText tag="h5" txt="돕고돕기" class-name="hidden xl:block" />
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
