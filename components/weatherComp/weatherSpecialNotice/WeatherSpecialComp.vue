<script setup lang="ts">
import type {IWeatherSpecialNoticeType} from "~/types/weather/weatherTypes";
import WeatherSpecialNoticeCode from "./WeatherSpecialNoticeCode.vue";

interface IWeatherSpecialType {
  weather: IWeatherSpecialNoticeType;
}
const {weather} = defineProps<IWeatherSpecialType>();
</script>
<template>
  <div
    class="flex flex-col gap-5 w-full h-full p-5 rounded-md border border-indigo-500"
  >
    <div class="flex items-center gap-5">
      <div class="size-5 bg-cyan-600 rounded-full" />
      <!-- 제목 -->
      <SharedText tag="h2" :txt="weather.TTL" />
    </div>
    <div class="flex items-center gap-5">
      <!-- 발표시각 -->
      <SharedText tag="h3" txt="발표시각" />
      <SharedText tag="h3" :txt="weather.PRSNTN_TM" />
      <span>|</span>
      <!-- 지점 -->
      <SharedText tag="h3" txt="지점" />
      <SharedText tag="h3" :txt="weather.BRNCH + ''" />
    </div>

    <!-- 발표내용 -->
    <div class="flex flex-col gap-2">
      <SharedText tag="h3" txt="발표내용" />
      <div class="bg-slate-700 p-5 rounded-md">
        <SharedText tag="h4" :txt="weather.PRSNTN_CN" />
      </div>
    </div>

    <!-- 특보발표 -->
    <div class="flex flex-col gap-2">
      <SharedText tag="h3" txt="특보발표" />
      <div class="flex flex-col gap-3 bg-slate-700 p-5 rounded-md">
        <!-- 특보발표코드 -->
        <div class="flex items-center gap-2">
          <WeatherSpecialNoticeCode :code="weather.SPNE_PRSNTN_CD + ''" />
          <SharedText tag="h3" :txt="`(${weather.SPNE_PRSNTN_CD})`" />
        </div>

        <!-- 발효시각 -->
        <div class="flex gap-3 items-center">
          <SharedText tag="h4" txt="발효시각 :" />
          <SharedText tag="h4" :txt="weather.SPNE_FRMNT_TM_TXT" />
        </div>

        <!-- 발효현황 -->
        <div>
          <SharedText tag="h4" txt="발효현황 :" />
          <SharedText tag="h4" :txt="weather.SPNE_FRMNT_PRCON_TM" />
          <SharedText tag="h4" :txt="weather.SPNE_FRMNT_PRCON_CN" />
        </div>
        <!-- 예비특보현황 -->
        <div class="flex gap-3">
          <SharedText tag="h4" txt="예비특보현황 :" />
          <SharedText tag="h4" :txt="weather.RSRV_SPNE_PRSNTN_PRCON_" />
        </div>
      </div>
    </div>
    <!-- 해당구역 -->
    <SharedText tag="h3" txt="해당구역" />
    <div class="bg-slate-700 p-5 rounded-md">
      <SharedText tag="h4" :txt="weather.RLVT_ZONE" />
    </div>
    <!-- 참고사항 -->
    <SharedText tag="h3" txt="참고사항" />
    <div class="bg-slate-700 p-5 rounded-md">
      <SharedText tag="h4" :txt="weather.REF_MTTR" />
    </div>
    <div class="flex self-end gap-3">
      <!-- 예보관 -->
      <SharedText tag="h4" txt="예보관" />
      <span>|</span>
      <SharedText tag="h4" :txt="weather.FCAST" />
      <span>/</span>
      <!-- 행정안전부입수일시 -->
      <SharedText tag="h4" txt="행정안전부입수일시" />
      <span>|</span>
      <SharedText tag="h4" :txt="weather.MAAS_OBNT_DT" />
    </div>
  </div>
</template>
