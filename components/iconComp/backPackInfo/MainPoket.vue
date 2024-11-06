<script setup lang="ts">
import BackPackInfoLayout from "./BackPackInfoLayout.vue";
import SharedText from "~/components/shared/SharedText.vue";

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
    <SharedText tag="h4" txt="메인 주머니" />
    <div
      class="flex flex-col w-full h-full bg-sky-700 rounded-md overflow-hidden"
    >
      <div class="flex items-center justify-center w-full h-[15%] p-2">
        <SharedText tag="p" txt="방수의류" />
      </div>
      <div class="flex h-full">
        <div class="flex items-center justify-center h-full bg-indigo-800 p-2">
          <SharedText tag="p" txt="텐트부품" class-name="text-nowrap" />
        </div>

        <div class="flex flex-col w-full h-full">
          <div class="flex">
            <div
              class="flex flex-col items-center justify-center w-full h-full bg-teal-700 p-1 *:text-center"
            >
              <SharedText
                tag="p"
                txt="음식 - 전투식량 / 열량 높은 음식(에너지바or초코바) / 통조림 / 건빵"
              />
            </div>
            <div
              class="flex flex-col items-center justify-center w-full h-full bg-lime-700 p-1 *:text-center"
            >
              <SharedText tag="p" txt="생수(1인당 하루 2리터)" />
            </div>
          </div>

          <div
            class="flex flex-col items-center justify-center w-full h-full bg-yellow-700"
          >
            <SharedText tag="p" txt="보온의류" />
            <SharedText tag="p" txt="양말 / 속옷" />
            <SharedText tag="p" txt="바람막이재킷" />
          </div>

          <div
            class="flex flex-col items-center justify-center w-full h-full bg-amber-800"
          >
            <SharedText tag="p" txt="간이담요" />
            <SharedText tag="p" txt="침낭" />
          </div>
          <div
            class="flex items-center justify-center w-full h-full bg-red-800"
          >
            <SharedText tag="p" txt="신발" />
          </div>
        </div>

        <div class="flex items-center justify-center h-full bg-indigo-800 p-2">
          <SharedText tag="p" txt="텐트부품" class-name="text-nowrap" />
        </div>
      </div>
    </div>
  </BackPackInfoLayout>
</template>
