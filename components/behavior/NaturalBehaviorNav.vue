<script setup lang="ts">
const emit = defineEmits(["natural"]);
const handleDataIdClick = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLDListElement;
  emit("natural", target.dataset.id);
};
</script>
<template>
  <nav>
    <ul class="flex gap-5 *:cursor-pointer">
      <li data-id="01001" @click="handleDataIdClick">태풍</li>
      <li data-id="01002" @click="handleDataIdClick">홍수</li>
      <li data-id="01003" @click="handleDataIdClick">호우</li>
      <li data-id="01004" @click="handleDataIdClick">강풍</li>
      <li data-id="01005" @click="handleDataIdClick">대설</li>
      <li data-id="01006" @click="handleDataIdClick">한파</li>
      <li data-id="01007" @click="handleDataIdClick">풍랑</li>
      <li data-id="01008" @click="handleDataIdClick">황사</li>
      <li data-id="01009" @click="handleDataIdClick">폭염</li>
      <li data-id="01010" @click="handleDataIdClick">가뭄</li>
      <li data-id="01011" @click="handleDataIdClick">지진</li>
      <li data-id="01012" @click="handleDataIdClick">지진해일</li>
      <li data-id="01013" @click="handleDataIdClick">해일</li>
      <li data-id="01014" @click="handleDataIdClick">산사태</li>
      <li data-id="01015" @click="handleDataIdClick">화산폭발</li>
      <li data-id="01016" @click="handleDataIdClick">침수</li>
      <li data-id="01017" @click="handleDataIdClick">낙뢰</li>
    </ul>
  </nav>
</template>
