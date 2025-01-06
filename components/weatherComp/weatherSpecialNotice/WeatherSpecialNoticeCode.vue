<script setup lang="ts">
interface IWeatherSpecialNoticeCode {
  code: string;
}
const {code} = defineProps<IWeatherSpecialNoticeCode>();
</script>
<template>
  <SharedText v-if="code === '1'" tag="h4" txt="강풍" />
  <SharedText v-if="code === '2'" tag="h4" txt="호우" />
  <SharedText v-if="code === '3'" tag="h4" txt="한파" />
  <SharedText v-if="code === '4'" tag="h4" txt="건조" />
  <SharedText v-if="code === '5'" tag="h4" txt="폭풍해일" />
  <SharedText v-if="code === '6'" tag="h4" txt="풍랑" />
  <SharedText v-if="code === '7'" tag="h4" txt="태풍" />
  <SharedText v-if="code === '8'" tag="h4" txt="대설" />
  <SharedText v-if="code === '9'" tag="h4" txt="황사" />
  <SharedText v-if="code === '12'" tag="h4" txt="폭염" />
  <SharedText v-if="code === '13'" tag="h4" txt="안개" />
</template>
