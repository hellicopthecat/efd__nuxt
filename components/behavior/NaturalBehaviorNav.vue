<script setup lang="ts">
import BehaviorNavLayout from "./BehaviorNavLayout.vue";
const id = ref("01001");
const emit = defineEmits(["natural"]);
const handleDataIdClick = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLDListElement;
  if (target.dataset.id) id.value = target.dataset.id;
  emit("natural", target.dataset.id);
};
</script>
<template>
  <BehaviorNavLayout>
    <li
      data-id="01001"
      @click="handleDataIdClick"
      :class="id === '01001' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      태풍
    </li>
    <li
      data-id="01002"
      @click="handleDataIdClick"
      :class="id === '01002' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      홍수
    </li>
    <li
      data-id="01003"
      @click="handleDataIdClick"
      :class="id === '01003' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      호우
    </li>
    <li
      data-id="01004"
      @click="handleDataIdClick"
      :class="id === '01004' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      강풍
    </li>
    <li
      data-id="01005"
      @click="handleDataIdClick"
      :class="id === '01005' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      대설
    </li>
    <li
      data-id="01006"
      @click="handleDataIdClick"
      :class="id === '01006' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      한파
    </li>
    <li
      data-id="01007"
      @click="handleDataIdClick"
      :class="id === '01007' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      풍랑
    </li>
    <li
      data-id="01008"
      @click="handleDataIdClick"
      :class="id === '01008' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      황사
    </li>
    <li
      data-id="01009"
      @click="handleDataIdClick"
      :class="id === '01009' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      폭염
    </li>
    <li
      data-id="01010"
      @click="handleDataIdClick"
      :class="id === '01010' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      가뭄
    </li>
    <li
      data-id="01011"
      @click="handleDataIdClick"
      :class="id === '01011' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      지진
    </li>
    <li
      data-id="01012"
      @click="handleDataIdClick"
      :class="id === '01012' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      지진해일
    </li>
    <li
      data-id="01013"
      @click="handleDataIdClick"
      :class="id === '01013' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      해일
    </li>
    <li
      data-id="01014"
      @click="handleDataIdClick"
      :class="id === '01014' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      산사태
    </li>
    <li
      data-id="01015"
      @click="handleDataIdClick"
      :class="id === '01015' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      화산폭발
    </li>
    <li
      data-id="01016"
      @click="handleDataIdClick"
      :class="id === '01016' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      침수
    </li>
    <li
      data-id="01017"
      @click="handleDataIdClick"
      :class="id === '01017' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      낙뢰
    </li>
  </BehaviorNavLayout>
</template>
