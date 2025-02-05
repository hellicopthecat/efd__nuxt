<script setup lang="ts">
import type {IDisasterMsgType} from "~/types/disasterMsg/disasterMsgType";

const disasterMsgData = ref<IDisasterMsgType[] | []>([]);
const msgMarginTop = ref(0);
const pending = ref(false);

const fetchData = async () => {
  pending.value = true;
  const result = await $fetch<IDisasterMsgType[]>(
    "/api/disasterMsg/disasterMsg",
    {
      method: "GET",
    }
  );
  disasterMsgData.value = result.toSorted((a, b) => 1 - result.length);
  pending.value = false;

  return result;
};

onMounted(async () => {
  await fetchData();
  setInterval(() => {
    msgMarginTop.value = msgMarginTop.value + 144;
    if (msgMarginTop.value >= 144 * disasterMsgData.value?.length!) {
      msgMarginTop.value = 0;
    }
  }, 3000);
});
</script>
<template>
  <div class="flex flex-col w-full mt-auto">
    <div class="w-full h-36 bg-red-600 overflow-hidden relative">
      <ul
        class="flex flex-col trasition ease-in-out duration-500"
        :style="{marginTop: `-${msgMarginTop}px`}"
      >
        <li
          v-for="data in disasterMsgData"
          :key="data.CRT_DT"
          class="flex flex-col gap-3 xl:gap-2 justify-center h-36 p-2"
        >
          <div class="flex xl:items-center gap-4">
            <p class="text-nowrap">
              {{ `${data.EMRG_STEP_NM}(${data.DST_SE_NM})` }}
            </p>
            <p :class="data.RCPTN_RGN_NM.length > 50 ? 'text-xs' : 'text-md'">
              {{ data.RCPTN_RGN_NM }}
            </p>
          </div>
          <div class="flex xl:items-center gap-4">
            <p>{{ data.CRT_DT }}</p>
            <p>{{ data.MSG_CN }}</p>
          </div>
        </li>
      </ul>
      <button
        class="absolute top-2 right-5 flex justify-center items-center size-10"
        :class="pending ? 'animate-spin' : 'animate-none'"
        @click.prevent="() => fetchData()"
      >
        <Icon name="mdi:refresh" class="size-5" />
      </button>
    </div>
  </div>
</template>
