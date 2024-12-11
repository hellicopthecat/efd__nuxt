<script setup lang="ts">
import type {INewForeCastType} from "~/types/weather/weatherTypes";
import SkyStatus from "../SkyStatus.vue";
import WindDirection from "../WindDirection.vue";
import RainfallProbability from "../RainfallProbability.vue";
import Precipitation from "../Precipitation.vue";
import SnowProbability from "../SnowProbability.vue";

interface IForcastInfo {
  data: INewForeCastType;
}
defineProps<IForcastInfo>();
</script>
<template>
  <SharedText
    tag="h2"
    :txt="`${data.fcstTime.slice(0, 2)}시`"
    class-name="text-right"
  />

  <div class="flex justify-between">
    <SkyStatus tag="h3" :sky-status="Number(data.SKY)" />
    <SharedText tag="h3" :txt="`${data.TMP} &deg;`" />
  </div>

  <div class="flex flex-col items-end">
    <div class="flex justify-between w-full">
      <SharedText tag="h5" txt="습도" />
      <SharedText tag="h5" :txt="`${data.REH} %`" />
    </div>
    <div class="flex justify-between w-full">
      <SharedText tag="h5" txt="강수확률" />
      <div class="flex gap-2">
        <Precipitation :weather-type="Number(data.PTY)" class-name="size-7" />
        <RainfallProbability tag="h5" :probability="Number(data.PCP)" />
        <SharedText tag="h5" :txt="`${data.POP}%`" />
      </div>
    </div>
  </div>

  <div>
    <SharedText tag="h4" txt="바람성분" />
    <div class="flex flex-col items-end">
      <div class="flex justify-between w-full">
        <SharedText tag="h5" txt="풍향" />
        <WindDirection tag="h5" :angle="Number(data.VEC)" />
      </div>

      <div class="flex flex-col justify-between w-full">
        <div class="flex justify-between">
          <SharedText tag="h5" txt="풍속" />
          <SharedText tag="h5" :txt="`${data.WSD} m/s`" />
        </div>

        <div class="flex justify-end gap-10">
          <SharedText
            tag="h5"
            :txt="
              data.UUU?.includes('-')
                ? `서 ${data.UUU} m/s`
                : `동 ${data.UUU} m/s`
            "
          />
          <SharedText
            tag="h5"
            :txt="
              data.VVV?.includes('-')
                ? `서 ${data.VVV} m/s`
                : `동 ${data.VVV} m/s`
            "
          />
        </div>
      </div>
    </div>
  </div>

  <div class="flex justify-between">
    <SharedText tag="h5" txt="적설량" />
    <SnowProbability tag="h5" :probability="Number(data.SNO)" />
  </div>
  <div class="flex justify-between">
    <SharedText tag="h5" txt="파고" />
    <SharedText tag="h5" :txt="`${data.WAV} M`" />
  </div>
</template>
