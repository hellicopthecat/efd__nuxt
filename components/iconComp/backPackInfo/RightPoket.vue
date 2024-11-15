<script setup lang="ts">
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
    <SharedText tag="h4" txt="오른쪽주머니" />
    <div
      class="flex flex-col gap-2 w-full h-full p-3 bg-cyan-800 rounded-md text-nowrap"
    >
      <SharedText tag="h4" txt="통신수단" />
      <div class="flex flex-col h-full">
        <!--  -->
        <div
          class="flex gap-3 w-full h-full bg-teal-700 p-2 rounded-md text-center line-"
        >
          <SharedText
            tag="p"
            txt="충전기"
            class-name="w-full h-full leading-loose"
          />
          <SharedText
            tag="p"
            txt="충전선"
            class-name="w-full h-full leading-loose"
          />
          <SharedText
            tag="p"
            txt="외장배터리"
            class-name="w-full h-full leading-loose"
          />
        </div>
        <!--  -->
        <div
          class="flex flex-col items-center justify-center w-full h-full bg-indigo-700 p-2 rounded-md"
        >
          <SharedText tag="p" txt="미니라디오" />
        </div>
        <!-- / -->
        <div
          class="flex flex-col items-center justify-center w-full h-full bg-pink-700 p-2 rounded-md"
        >
          <SharedText tag="p" txt="조명탄" />
          <SharedText tag="p" txt="야광봉" />
          <SharedText tag="p" txt="근거리무전기" />
          <SharedText tag="p" txt="호루라기" />
        </div>
      </div>
    </div>
  </BackPackInfoLayout>
</template>
