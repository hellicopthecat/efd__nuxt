<script setup lang="ts">
import type {IBehaviorTypes} from "~/types/behavior/behaviorTypes";
import LoadingIndicator from "../shared/LoadingIndicator.vue";
interface IBehaviorData {
  behavior: IBehaviorTypes[] | null;
  headTitle: 1 | 2 | 3 | 4;
}
defineProps<IBehaviorData>();
</script>
<template>
  <div v-if="!behavior">
    <LoadingIndicator />
  </div>
  <div v-if="behavior" class="flex flex-col gap-10">
    <div class="flex gap-3 items-center">
      <SharedText v-if="headTitle === 1" tag="h3" txt="자연재난" />
      <SharedText v-if="headTitle === 2" tag="h3" txt="사회재난" />
      <SharedText v-if="headTitle === 3" tag="h3" txt="생활안전" />
      <SharedText v-if="headTitle === 4" tag="h3" txt="민방위" />
      <SharedText tag="h3" txt="-" />
      <SharedText tag="h3" :txt="behavior[0].safetyCateNm3[0]" />
    </div>
    <div class="flex flex-col gap-3">
      <div v-for="data in behavior" class="flex gap-5">
        <SharedText
          v-if="
            data.actRmks &&
            data.mainOrd[0] !== '390' &&
            data.mainOrd[0] !== '510' &&
            data.mainOrd[0] !== '530'
          "
          tag="h5"
          :txt="data.actRmks[0]"
        />
        <NuxtLink
          class="hover:text-white"
          v-if="
            data.contentsUrl &&
            !/(\.png|\.m3u8|\.mp4)$/i.test(String(data.contentsUrl[0]))
          "
          :to="data.contentsUrl[0]"
        >
          <SharedText tag="h5" txt="링크바로가기" />
        </NuxtLink>
        <NuxtImg
          class="mx-auto w-[470px] h-[360px] my-10"
          v-if="
            data.contentsUrl && String(data.contentsUrl[0]).includes('.png')
          "
          :src="data.contentsUrl[0]"
        />
      </div>
    </div>
  </div>
</template>
