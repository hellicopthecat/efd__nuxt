<script setup lang="ts">
import type {IWeatherSpecialNoticeType} from "~/types/weather/weatherTypes";
import WeatherSpecialNoticeCode from "./WeatherSpecialNoticeCode.vue";
import {number} from "yup";

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
      <h2 class="text-xl font-semibold xl:text-5xl xl:font-bold">
        {{ weather.TTL }}
      </h2>
    </div>
    <div class="flex flex-col xl:flex-row xl:items-center xl:gap-5">
      <!-- 발표시각 -->
      <h3 class="text-2xl font-bold">발표시각</h3>
      <p class="text-xl font-semibold">
        {{ weather.PRSNTN_TM.substring(8, -1) }}
      </p>
      <span class="hidden xl:block">|</span>
      <!-- 지점 -->
      <h3 class="text-2xl font-bold">지점</h3>
      <p class="text-xl font-semibold">{{ weather.BRNCH }}</p>
    </div>

    <!-- 발표내용 -->
    <div class="flex flex-col gap-2">
      <h3 class="text-xl font-bold xl:text-2xl">발표내용</h3>
      <div class="bg-slate-700 p-5 rounded-md">
        <p class="text-xl font-semibold" v-html="weather.PRSNTN_CN" />
      </div>
    </div>

    <!-- 특보발표 -->
    <div class="flex flex-col gap-2">
      <h3 class="text-xl font-bold xl:text-2xl">특보발표</h3>
      <div class="flex flex-col gap-3 bg-slate-700 p-5 rounded-md">
        <!-- 특보발표코드 -->
        <div class="flex items-center gap-2">
          <WeatherSpecialNoticeCode :code="weather.SPNE_PRSNTN_CD + ''" />
          <SharedText tag="h4" :txt="`(${weather.SPNE_PRSNTN_CD + ''})`" />
        </div>

        <!-- 발효시각 -->
        <div class="flex flex-col xl:flex-row gap-3 xl:items-center">
          <SharedText tag="h4" txt="발효시각 :" class-name="text-nowrap" />
          <p class="text-xl font-semibold" v-html="weather.SPNE_FRMNT_TM_TXT" />
        </div>

        <!-- 발효현황 -->
        <div>
          <h4 class="xl:text-lg font-bold">발표현황 :</h4>
          <p
            class="xl:text-xl xl:font-semibold"
            v-html="weather.SPNE_FRMNT_PRCON_TM"
          />
          <p
            class="xl:text-xl xl:font-semibold"
            v-html="weather.SPNE_FRMNT_PRCON_CN"
          />
        </div>
        <!-- 예비특보현황 -->
        <div class="flex gap-3">
          <h4 class="xl:text-lg font-bold">예비특보현황 :</h4>
          <p
            class="xl:text-xl xl:font-semibold"
            v-html="weather.RSRV_SPNE_PRSNTN_PRCON_"
          />
        </div>
      </div>
    </div>
    <!-- 해당구역 -->
    <h3 class="text-xl font-bold xl:text-2xl">해당구역</h3>
    <div class="bg-slate-700 p-5 rounded-md">
      <p class="xl:text-xl xl:font-semibold" v-html="weather.RLVT_ZONE" />
    </div>
    <!-- 참고사항 -->
    <h3 class="text-xl font-bold xl:text-2xl">참고사항</h3>
    <div class="bg-slate-700 p-5 rounded-md">
      <p class="xl:text-xl xl:font-semibold" v-html="weather.REF_MTTR" />
    </div>
    <div class="flex flex-col xl:flex-row xl:self-end xl:gap-3">
      <!-- 예보관 -->
      <h4 class="text-lg xl:text-xl xl:font-semibold">예보관</h4>
      <span class="hidden xl:block">|</span>
      <p class="xl:text-xl xl:font-semibold" v-html="weather.FCAST" />
      <span class="hidden xl:block">/</span>
      <!-- 행정안전부입수일시 -->
      <h4 class="text-lg xl:text-xl xl:font-semibold">행정안전부입수일시</h4>
      <span class="hidden xl:block">|</span>
      <p class="xl:text-xl xl:font-semibold" v-html="weather.MAAS_OBNT_DT" />
    </div>
  </div>
</template>
