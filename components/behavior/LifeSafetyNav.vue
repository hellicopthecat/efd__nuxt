<script setup lang="ts">
import BehaviorNavLayout from "./BehaviorNavLayout.vue";
const id = ref("03002");
const emit = defineEmits(["lifeSafety", "getHeadText"]);
const handleDataIdClick = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLDListElement;
  if (target.dataset.id) id.value = target.dataset.id;
  emit("lifeSafety", target.dataset.id);
  emit("getHeadText", target.dataset.text);
};
</script>
<template>
  <BehaviorNavLayout>
    <li
      data-id="03002"
      data-text="응급처치"
      @click="handleDataIdClick"
      :class="id === '03002' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      응급처치
    </li>
    <li
      data-id="03003"
      data-text="심폐소생술"
      @click="handleDataIdClick"
      :class="id === '03003' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      심폐소생술
    </li>
    <li
      data-id="03004"
      data-text="소화기 사용법"
      @click="handleDataIdClick"
      :class="id === '03004' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      소화기 사용법
    </li>
    <li
      data-id="03005"
      data-text="식중동"
      @click="handleDataIdClick"
      :class="id === '03005' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      식중동
    </li>
    <li
      data-id="03006"
      data-text="산행안전"
      @click="handleDataIdClick"
      :class="id === '03006' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      산행안전
    </li>
    <li
      data-id="03007"
      data-text="놀이시설안전"
      @click="handleDataIdClick"
      :class="id === '03007' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      놀이시설안전
    </li>
    <li
      data-id="03008"
      data-text="실종유괴 예방"
      @click="handleDataIdClick"
      :class="id === '03008' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      실종유괴 예방
    </li>
    <li
      data-id="03009"
      data-text="성폭력 예방"
      @click="handleDataIdClick"
      :class="id === '03009' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      성폭력 예방
    </li>
    <li
      data-id="03010"
      data-text="학교 폭력 예방"
      @click="handleDataIdClick"
      :class="id === '03010' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      학교 폭력 예방
    </li>
    <li
      data-id="03011"
      data-text="가정 폭력 예방"
      @click="handleDataIdClick"
      :class="id === '03011' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      가정 폭력 예방
    </li>
    <li
      data-id="03012"
      data-text="억류 및 납치 시 대처요령"
      @click="handleDataIdClick"
      :class="id === '03012' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      억류 및 납치 시 대처요령
    </li>
    <li
      data-id="03013"
      data-text="교통사고"
      @click="handleDataIdClick"
      :class="id === '03013' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      교통사고
    </li>
    <li
      data-id="03014"
      data-text="승강기 안전사고"
      @click="handleDataIdClick"
      :class="id === '03014' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      승강기 안전사고
    </li>
    <li
      data-id="03015"
      data-text="미세먼지"
      @click="handleDataIdClick"
      :class="id === '03015' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      미세먼지
    </li>
    <li
      data-id="03016"
      data-text="소화전 사용법"
      @click="handleDataIdClick"
      :class="id === '03016' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      소화전 사용법
    </li>
    <li
      data-id="03017"
      data-text="가정안전점검"
      @click="handleDataIdClick"
      :class="id === '03017' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      가정안전점검
    </li>
  </BehaviorNavLayout>
</template>
