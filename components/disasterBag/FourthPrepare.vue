<script setup lang="ts">
import SharedText from "../shared/SharedText.vue";
</script>

<template>
  <li>
    <SharedText tag="h4" txt="[가정용 비상약품 (비상구급상자 점검목록)]" />
    <ul class="list-disc">
      <li>
        의약품 : 소독제, 해열진통제, 소화제, 지사제,화상연고,지혈제, 소염제
      </li>
      <li>의료기구 : 핀세트, 가위</li>
      <li>위생재료 : 붕대, 탈지면, 반창고, 삼각건</li>
    </ul>
  </li>
  <li>
    <SharedText tag="h4" txt="[마을 공동 준비사항]" />
    <ul class="list-disc">
      <li>비상대피시설 : 지하실, 대피호</li>
      <li>응급복구물자 : 마대, 끈, 말뚝, 삼, 곡괭이, 사다리</li>
    </ul>
  </li>
  <li>
    <SharedText tag="h4" txt="[화생방전 비상용품]" />
    <ul class="list-disc">
      <li>방독면 또는 비닐, 수건, 마스크</li>
      <li>보호옷, 보호두건 또는 비닐옷</li>
      <li>방독(고무)장화, 방독(고무)장갑</li>
    </ul>
  </li>
</template>
