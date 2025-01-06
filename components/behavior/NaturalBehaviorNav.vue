<script setup lang="ts">
import BehaviorNavLayout from "./BehaviorNavLayout.vue";
const id = ref("01001");
const emit = defineEmits(["natural", "getHeadText"]);
const handleDataIdClick = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLLIElement;
  if (target.dataset.id) id.value = target.dataset.id;
  emit("natural", target.dataset.id);
  emit("getHeadText", target.dataset.text);
};
</script>
<template>
  <BehaviorNavLayout>
    <li
      data-id="01001"
      data-text="태풍"
      @click="handleDataIdClick"
      :class="id === '01001' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      태풍
    </li>
    <li
      data-id="01002"
      data-text="홍수"
      @click="handleDataIdClick"
      :class="id === '01002' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      홍수
    </li>
    <li
      data-id="01003"
      data-text="호우"
      @click="handleDataIdClick"
      :class="id === '01003' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      호우
    </li>
    <li
      data-id="01004"
      data-text="강풍"
      @click="handleDataIdClick"
      :class="id === '01004' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      강풍
    </li>
    <li
      data-id="01005"
      data-text="대설"
      @click="handleDataIdClick"
      :class="id === '01005' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      대설
    </li>
    <li
      data-id="01006"
      data-text="한파"
      @click="handleDataIdClick"
      :class="id === '01006' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      한파
    </li>
    <li
      data-id="01007"
      data-text="풍랑"
      @click="handleDataIdClick"
      :class="id === '01007' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      풍랑
    </li>
    <li
      data-id="01008"
      data-text="황사"
      @click="handleDataIdClick"
      :class="id === '01008' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      황사
    </li>
    <li
      data-id="01009"
      data-text="폭염"
      @click="handleDataIdClick"
      :class="id === '01009' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      폭염
    </li>
    <li
      data-id="01010"
      data-text="가뭄"
      @click="handleDataIdClick"
      :class="id === '01010' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      가뭄
    </li>
    <li
      data-id="01011"
      data-text="지진"
      @click="handleDataIdClick"
      :class="id === '01011' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      지진
    </li>
    <li
      data-id="01012"
      data-text="지진해일"
      @click="handleDataIdClick"
      :class="id === '01012' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      지진해일
    </li>
    <li
      data-id="01013"
      data-text="해일"
      @click="handleDataIdClick"
      :class="id === '01013' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      해일
    </li>
    <li
      data-id="01014"
      data-text="산사태"
      @click="handleDataIdClick"
      :class="id === '01014' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      산사태
    </li>
    <li
      data-id="01015"
      data-text="화산폭발"
      @click="handleDataIdClick"
      :class="id === '01015' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      화산폭발
    </li>
    <li
      data-id="01016"
      data-text="침수"
      @click="handleDataIdClick"
      :class="id === '01016' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      침수
    </li>
    <li
      data-id="01017"
      data-text="낙뢰"
      @click="handleDataIdClick"
      :class="id === '01017' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      낙뢰
    </li>
  </BehaviorNavLayout>
</template>
