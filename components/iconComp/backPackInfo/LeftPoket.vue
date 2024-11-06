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
    <SharedText tag="h4" txt="왼쪽 주머니" />
    <div class="flex flex-col w-full h-full bg-sky-800 p-3 rounded-md">
      <SharedText
        tag="p"
        txt="생활용품 - 상처치료 및 수건용 부직포타월 / 휴지 / 마스크 혹은 방독면 / 라이터 혹은 파이어스타터(부싯돌) / 물컵 / 서바이벌 팔찌(로프로 사용가능한 매듭팔찌) / 세면도구 / 나침반 / 양초 / 손전등(배터리포함) / 접이식 다용도칼 / 비누 / 숟가락(포크락) / 면도기 / 현금"
      />
    </div>
  </BackPackInfoLayout>
</template>
