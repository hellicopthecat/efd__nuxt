<script setup lang="ts">
import type {IBehaviorTypes} from "~/types/behavior/behaviorTypes";
import LoadingIndicator from "../shared/LoadingIndicator.vue";
import Hls from "hls.js";
//props
interface IBehaviorData {
  behavior: IBehaviorTypes[] | null;
  headTitle: 1 | 2 | 3 | 4;
}
const {behavior} = defineProps<IBehaviorData>();
const hlsInstance: Hls[] = [];
//fn
const m3u8Player = async (url: string, videoID: string) => {
  const video = document.getElementById(videoID) as HTMLVideoElement;
  if (Hls.isSupported()) {
    const hls = new Hls({});
    hls.loadSource(url);
    hls.attachMedia(video);
    hls.on(Hls.Events.ERROR, (event, data) => {
      if (data.fatal) {
        video.src = data.url + "";
      }
    });
    hlsInstance.push(hls);
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = url;
  }
};
// const rtspPlayer = async (url: string, videoID: string) => {
//   const video = document.getElementById(videoID) as HTMLVideoElement;
// };
watch(
  () => behavior,
  async (newBehavior) => {
    if (newBehavior) {
      await nextTick();
      newBehavior.forEach((data, index) => {
        if (data.contentsUrl?.includes("m3u8")) {
          m3u8Player(data.contentsUrl, `m3u8VideoTag-${index}`);
        }
        if (data.contentsUrl?.includes("rtsp")) {
          // rtspPlayer(data.contentsUrl, `m3u8VideoTag-${index}`);
        }
      });
    }
  }
);
onUnmounted(() => {
  hlsInstance.forEach((hls) => {
    hls.destroy();
  });
});
</script>
<template>
  <div class="w-full h-full">
    <div
      v-if="!behavior"
      class="flex items-center justify-center w-full h-full"
    >
      <LoadingIndicator />
    </div>
    <div v-else class="flex flex-col gap-10">
      <div class="flex gap-3 items-center">
        <SharedText v-if="headTitle === 1" tag="h3" txt="자연재난" />
        <SharedText v-if="headTitle === 2" tag="h3" txt="사회재난" />
        <SharedText v-if="headTitle === 3" tag="h3" txt="생활안전" />
        <SharedText v-if="headTitle === 4" tag="h3" txt="민방위" />
        <SharedText tag="h3" txt="-" />
        <SharedText tag="h3" :txt="behavior[0].safety_cate_nm2" />
      </div>
      <div class="flex flex-col gap-3">
        <div
          v-for="(data, index) in behavior"
          :key="index"
          class="flex flex-col gap-5"
        >
          <SharedText v-if="data.actRmks" tag="h5" :txt="data.actRmks" />
          <NuxtLink
            class="hover:text-white"
            v-if="
              data.contentsUrl &&
              !/(\.png|\.m3u8|\.mp4)$/i.test(String(data.contentsUrl))
            "
            :to="data.contentsUrl"
          >
            <SharedText tag="h5" txt="링크바로가기" />
          </NuxtLink>
          <NuxtImg
            class="mx-auto w-[470px] h-[360px] my-10"
            v-if="data.contentsUrl && String(data.contentsUrl).includes('.png')"
            :src="data.contentsUrl"
          />
          <video
            v-if="data.contentsUrl && data.contentsUrl.includes('m3u8')"
            :id="`m3u8VideoTag-${index}`"
            width="1500"
            controls
          ></video>
          <video
            v-if="data.contentsUrl && data.contentsUrl.includes('rtsp')"
            :id="`m3u8VideoTag-${index}`"
            width="1500"
            controls
          ></video>
        </div>
      </div>
    </div>
  </div>
</template>
