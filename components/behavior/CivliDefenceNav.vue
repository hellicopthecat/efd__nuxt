<script setup lang="ts">
const id = ref("04001");
const emit = defineEmits(["civilDefence", "getHeadText"]);
const handleDataIdClick = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLDListElement;
  if (target.dataset.id) id.value = target.dataset.id;
  emit("civilDefence", target.dataset.id);
  emit("getHeadText", target.dataset.text);
};
</script>
<template>
  <BehaviorNavLayout>
    <li
      data-id="04001"
      data-text="비상사태"
      @click="handleDataIdClick"
      :class="id === '04001' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      비상사태
    </li>
    <li
      data-id="04002"
      data-text="민방공"
      @click="handleDataIdClick"
      :class="id === '04002' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      민방공
    </li>
    <li
      data-id="04003"
      data-text="화생방무기"
      @click="handleDataIdClick"
      :class="id === '04003' ? 'bg-slate-500' : 'bg-slate-700'"
    >
      화생방무기
    </li>
  </BehaviorNavLayout>
</template>
