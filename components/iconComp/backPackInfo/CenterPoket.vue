<script setup lang="ts">
import SharedText from "~/components/shared/SharedText.vue";
import BackPackInfoLayout from "./BackPackInfoLayout.vue";

const props = defineProps({
  mouseX: Number,
  mouseY: Number,
  switch: Boolean,
});
</script>
<template>
  <BackPackInfoLayout
    :mouse-x="props.mouseX"
    :mouse-y="props.mouseY"
    :switch="props.switch"
  >
    <SharedText tag="h4" txt="앞주머니" />
    <div
      class="flex flex-col w-full h-full bg-red-800 p-3 rounded-md *:text-center"
    >
      <div
        class="flex justify-center items-center w-full h-full bg-emerald-800 p-5"
      >
        <SharedText
          tag="p"
          txt="비상약품 - 소독제 / 해열진통제 / 소화제 / 지사제 / 화상연고 / 지혈제 / 소염제 / 핀셋 / 가위 / 붕대 / 탈지면 / 반창고 / 삼각건 / 기타 처방약 "
        />
      </div>

      <div class="flex justify-center items-center w-full h-full bg-teal-600">
        <SharedText tag="p" txt="핫팩" />
      </div>

      <div class="flex justify-center items-center w-full h-full">
        <SharedText tag="p" txt="응급보온포" />
      </div>
    </div>
  </BackPackInfoLayout>
</template>
