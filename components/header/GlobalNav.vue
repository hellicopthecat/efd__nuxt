<script setup lang="ts">
import {ACCESSTOKEN} from "~/utils/constants/constants";
import SharedText from "../shared/SharedText.vue";
const accessToken = useCookie(ACCESSTOKEN);
</script>
<template>
  <nav class="w-full">
    <ul class="flex flex-col gap-1 hover:*:bg-slate-500 *:p-2 *:rounded-md">
      <li>
        <NuxtLink to="/" class="flex justify-between items-center">
          <Icon name="fa6-solid:house" class="size-6" />
          <SharedText tag="h5" txt="홈" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/weather" class="flex justify-between items-center">
          <Icon name="fa6-solid:cloud-sun-rain" class="size-6" />
          <SharedText tag="h5" txt="날씨" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/weatherSpecial"
          class="flex justify-between items-center"
        >
          <Icon name="mdi:chat-alert" class="size-6" />
          <SharedText tag="h5" txt="기상특보" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/behavior" class="flex justify-between items-center">
          <Icon name="mdi:exit-run" class="size-6" />
          <SharedText tag="h5" txt="재난시 행동요령" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/disasterbag" class="flex justify-between items-center">
          <Icon name="icon-park-solid:backpack" class="size-6" />
          <SharedText tag="h5" txt="재난구호대비" />
        </NuxtLink>
      </li>
      <li v-if="accessToken">
        <NuxtLink to="/market" class="flex justify-between items-center">
          <Icon name="icon-park-twotone:weixin-market" class="size-6" />
          <SharedText tag="h5" txt="돕고돕기" />
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
