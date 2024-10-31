<script setup lang="ts">
import BehaviorNavLayout from "./BehaviorNavLayout.vue";
const id = ref("03002");
const emit = defineEmits(["lifeSafety"]);
const handleDataIdClick = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLDListElement;
  if (target.dataset.id) id.value = target.dataset.id;
  emit("lifeSafety", target.dataset.id);
};
</script>
<template>
  <BehaviorNavLayout>
    <li
      data-id="03002"
      @click="handleDataIdClick"
      :class="id === '03002' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      응급처치
    </li>
    <li
      data-id="03003"
      @click="handleDataIdClick"
      :class="id === '03003' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      심폐소생술
    </li>
    <li
      data-id="03004"
      @click="handleDataIdClick"
      :class="id === '03004' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      소화기 사용법
    </li>
    <li
      data-id="03005"
      @click="handleDataIdClick"
      :class="id === '03005' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      식중동
    </li>
    <li
      data-id="03006"
      @click="handleDataIdClick"
      :class="id === '03006' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      산행안전
    </li>
    <li
      data-id="03007"
      @click="handleDataIdClick"
      :class="id === '03007' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      놀이시설안전
    </li>
    <li
      data-id="03008"
      @click="handleDataIdClick"
      :class="id === '03008' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      실종유괴 예방
    </li>
    <li
      data-id="03009"
      @click="handleDataIdClick"
      :class="id === '03009' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      성폭력 예방
    </li>
    <li
      data-id="03010"
      @click="handleDataIdClick"
      :class="id === '03010' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      학교 폭력 예방
    </li>
    <li
      data-id="03011"
      @click="handleDataIdClick"
      :class="id === '03011' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      가정 폭력 예방
    </li>
    <li
      data-id="03012"
      @click="handleDataIdClick"
      :class="id === '03012' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      억류 및 납치 시 대처요령
    </li>
    <li
      data-id="03013"
      @click="handleDataIdClick"
      :class="id === '03013' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      교통사고
    </li>
    <li
      data-id="03014"
      @click="handleDataIdClick"
      :class="id === '03014' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      승강기 안전사고
    </li>
    <li
      data-id="03015"
      @click="handleDataIdClick"
      :class="id === '03015' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      미세먼지
    </li>
    <li
      data-id="03016"
      @click="handleDataIdClick"
      :class="id === '03016' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      소화전 사용법
    </li>
    <li
      data-id="03017"
      @click="handleDataIdClick"
      :class="id === '03017' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      가정안전점검
    </li>
  </BehaviorNavLayout>
</template>
