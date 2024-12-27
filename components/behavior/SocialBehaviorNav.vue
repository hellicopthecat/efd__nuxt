<script setup lang="ts">
import BehaviorNavLayout from "./BehaviorNavLayout.vue";
const id = ref("02001");
const emit = defineEmits(["social", "getHeadText"]);
const handleDataIdClick = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLDListElement;
  if (target.dataset.id) id.value = target.dataset.id;
  emit("social", target.dataset.id);
  emit("getHeadText", target.dataset.text);
};
</script>
<template>
  <BehaviorNavLayout>
    <li
      data-id="02001"
      data-text="해양오염사고"
      @click="handleDataIdClick"
      :class="id === '02001' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      해양오염사고
    </li>
    <li
      data-id="02002"
      data-text="대규모 수질오염"
      @click="handleDataIdClick"
      :class="id === '02002' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      대규모 수질오염
    </li>
    <li
      data-id="02003"
      data-text="식용수"
      @click="handleDataIdClick"
      :class="id === '02003' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      식용수
    </li>
    <li
      data-id="02004"
      data-text="공동구 재난"
      @click="handleDataIdClick"
      :class="id === '02004' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      공동구 재난
    </li>
    <li
      data-id="02005"
      data-text="가축질병"
      @click="handleDataIdClick"
      :class="id === '02005' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      가축질병
    </li>
    <li
      data-id="02006"
      data-text="감염병 예방"
      @click="handleDataIdClick"
      :class="id === '02006' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      감염병 예방
    </li>
    <li
      data-id="02007"
      data-text="철도﹒지하철사고"
      @click="handleDataIdClick"
      :class="id === '02007' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      철도﹒지하철사고
    </li>
    <li
      data-id="02008"
      data-text="금융전산"
      @click="handleDataIdClick"
      :class="id === '02008' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      금융전산
    </li>
    <li
      data-id="02009"
      data-text="원전사고"
      @click="handleDataIdClick"
      :class="id === '02009' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      원전사고
    </li>
    <li
      data-id="02010"
      data-text="화학물질사고"
      @click="handleDataIdClick"
      :class="id === '02010' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      화학물질사고
    </li>
    <li
      data-id="02011"
      data-text="화재"
      @click="handleDataIdClick"
      :class="id === '02011' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      화재
    </li>
    <li
      data-id="02012"
      data-text="산불"
      @click="handleDataIdClick"
      :class="id === '02012' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      산불
    </li>
    <li
      data-id="02013"
      data-text="건축물 붕괴"
      @click="handleDataIdClick"
      :class="id === '02013' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      건축물 붕괴
    </li>
    <li
      data-id="02014"
      data-text="댐 붕괴"
      @click="handleDataIdClick"
      :class="id === '02014' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      댐 붕괴
    </li>
    <li
      data-id="02015"
      data-text="폭발"
      @click="handleDataIdClick"
      :class="id === '02015' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      폭발
    </li>
    <li
      data-id="02016"
      data-text="항공기사고"
      @click="handleDataIdClick"
      :class="id === '02016' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      항공기사고
    </li>
    <li
      data-id="02017"
      data-text="화생방사고"
      @click="handleDataIdClick"
      :class="id === '02017' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      화생방사고
    </li>
    <li
      data-id="02018"
      data-text="정전"
      @click="handleDataIdClick"
      :class="id === '02018' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      정전
    </li>
    <li
      data-id="02019"
      data-text="전기﹒가스사고"
      @click="handleDataIdClick"
      :class="id === '02019' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      전기﹒가스사고
    </li>
    <li
      data-id="02020"
      data-text="유도선 사고"
      @click="handleDataIdClick"
      :class="id === '02020' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      유도선 사고
    </li>
    <li
      data-id="02021"
      data-text="수난사고"
      @click="handleDataIdClick"
      :class="id === '02021' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      수난사고
    </li>
    <li
      data-id="02022"
      data-text="테러발생시"
      @click="handleDataIdClick"
      :class="id === '02022' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      테러발생시
    </li>
    <li
      data-id="02023"
      data-text="전력수급단계별"
      @click="handleDataIdClick"
      :class="id === '02023' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      전력수급단계별
    </li>
  </BehaviorNavLayout>
</template>
