<script setup lang="ts">
import type {IDisasterMsgType} from "~/types/disasterMsg/disasterMsgType";
import SharedText from "../shared/SharedText.vue";

const disasterMsgData = ref<IDisasterMsgType[] | null>(null);
const msgCont = ref("msgCont");
const msgMarginTop = ref(0);
const fetchData = async () => {
  const result = await $fetch<IDisasterMsgType[]>(
    "/api/disasterMsg/disasterMsg"
  );
  disasterMsgData.value = result;
};
onMounted(async () => {
  await fetchData();
  const msgContainer = document.getElementById("msgCont");
  if (msgContainer) {
    setInterval(() => {
      msgMarginTop.value = msgMarginTop.value + 144;
      if (msgMarginTop.value >= 144 * disasterMsgData.value?.length!) {
        msgMarginTop.value = 0;
      }
    }, 3000);
  }
});
</script>
<template>
  <div class="flex flex-col w-full mt-auto">
    <div v-if="disasterMsgData" class="w-full h-36 bg-red-600 overflow-hidden">
      <div
        :id="msgCont"
        class="trasition ease-in-out duration-500"
        :style="{marginTop: `-${msgMarginTop}px`}"
      >
        <div
          v-for="data in disasterMsgData"
          class="flex flex-col gap-3 xl:gap-2 justify-center h-36 p-2"
        >
          <div class="flex xl:items-center gap-4">
            <SharedText
              tag="p"
              :txt="`${data.EMRG_STEP_NM}(${data.DST_SE_NM})`"
              class-name="text-nowrap"
            />
            <SharedText tag="p" :txt="data.RCPTN_RGN_NM" />
          </div>
          <div class="flex xl:items-center gap-4">
            <SharedText tag="p" :txt="data.CRT_DT" />
            <SharedText tag="p" :txt="data.MSG_CN" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
