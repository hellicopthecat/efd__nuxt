<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import type {IDefaultApiResponse} from "~/types/apiType";
import type {IWeatherTodayTomorrowTypes} from "~/types/weather/weatherTypes";
import Precipitation from "../Precipitation.vue";
import SkyStatus from "../SkyStatus.vue";
import WindPower from "../WindPower.vue";
import WindDirection from "../WindDirection.vue";
const isLoading = ref(false);
//예보시간
const fcstTime = ref<string[]>([]);
//낙뢰
const lighting = ref<string[]>([]);
//강수형태
const precipitation = ref<string[]>([]);
//1시간 강수량
const rainPerHour = ref<string[]>([]);
//하늘 상태
const skyStatus = ref<string[]>([]);
//기온
const temperature = ref<string[]>([]);
//습도
const humidity = ref<string[]>([]);
//동서바람성분
const windEastWest = ref<string[]>([]);
//남북바람성분
const windNorthSouth = ref<string[]>([]);
//풍향
const windDirection = ref<string[]>([]);
//풍속
const windSpeed = ref<string[]>([]);
//chart
const series = ref<{name: string; type: string; data: string[]}[]>([]);
const chartOptions = ref();
const getWeatherToday = async (lat: number, lng: number) => {
  isLoading.value = true;
  const data = await $fetch<IDefaultApiResponse>("/api/weather/todayWeather", {
    method: "GET",
    query: {
      x: lat,
      y: lng,
    },
  });
  (data.response.body.items.item as IWeatherTodayTomorrowTypes[]).map(
    (weather: IWeatherTodayTomorrowTypes) => {
      fcstTime.value.push(weather.fcstTime);
      if (weather.category === "LGT") lighting.value.push(weather.fcstValue);
      if (weather.category === "PTY")
        precipitation.value.push(weather.fcstValue);
      if (weather.category === "RN1") {
        if (weather.fcstValue === "강수없음") {
          rainPerHour.value.push("0");
        } else {
          rainPerHour.value.push(weather.fcstValue);
        }
      }
      if (weather.category === "SKY") skyStatus.value.push(weather.fcstValue);
      if (weather.category === "T1H") temperature.value.push(weather.fcstValue);
      if (weather.category === "REH") humidity.value.push(weather.fcstValue);
      if (weather.category === "UUU")
        windEastWest.value.push(weather.fcstValue);
      if (weather.category === "VVV")
        windNorthSouth.value.push(weather.fcstValue);
      if (weather.category === "VEC")
        windDirection.value.push(weather.fcstValue);
      if (weather.category === "WSD") windSpeed.value.push(weather.fcstValue);
    }
  );
  series.value.push(
    {
      name: "시간당 강수량",
      type: "line",
      data: rainPerHour.value,
    },
    {
      name: "온도",
      type: "column",
      data: temperature.value,
    }
  );
  chartOptions.value = {
    chart: {
      height: 350,
      type: "line",
    },
    stroke: {
      width: [4, 0],
    },
    title: {
      text: "오늘 날씨",
      style: {color: "white"},
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [0],
    },
    labels: fcstTime.value,
    yaxis: [
      {
        title: {text: "1시간 강수량", style: {color: "white"}},
        labels: {
          style: {colors: ["white"]},
          formatter: function (value: string) {
            return value + " mm";
          },
        },
      },
      {
        opposite: true,
        title: {text: "온도", style: {color: "white"}},
        labels: {
          style: {colors: ["white"]},
          formatter: function (value: string) {
            return `${value} ℃`;
          },
        },
      },
    ],
    xaxis: {
      labels: {
        style: {colors: ["white", "white", "white", "white", "white", "white"]},
        formatter: function (value: any) {
          return String(value).replace(/(\d{2})(\d{2})/, "$1:$2");
        },
      },
      axisTicks: {color: "white"},
    },
    legend: {
      labels: {colors: "white"},
      markers: {
        size: 10,
        offsetX: -10,
      },
      itemMargin: {
        horizontal: 20,
      },
    },
  };
  isLoading.value = false;
};
onMounted(() => {
  navigator.geolocation.getCurrentPosition(({coords}) => {
    getWeatherToday(coords.latitude, coords.longitude);
  });
});
</script>
<template>
  <section class="flex flex-col gap-20">
    <SharedText tag="h2" txt="오늘 날씨예보" class-name="text-white" />
    <section>
      <NuxtImg v-if="isLoading" src="/utilIcon/loading.gif" />
      <ClientOnly v-else="!isLoading">
        <VueApexCharts
          type="line"
          height="350"
          :options="chartOptions"
          :series="series"
        />
      </ClientOnly>
    </section>
    <section class="grid grid-cols-6 gap-10 w-full">
      <div
        v-for="(time, index) in fcstTime.slice(0, 6)"
        class="flex flex-col items-end bg-gray-700 p-5 rounded-xl"
      >
        <SharedText
          tag="h2"
          :txt="time.replace(/(\d{2})(\d{2})/, '$1:$2')"
          class-name="text-white"
        />

        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-3">
            <Precipitation
              :weather-type="Number(precipitation[index])"
              class-name="size-10"
              super-period
            />
            <SkyStatus
              tag="h4"
              :sky-status="Number(skyStatus[index])"
              class-name="text-white"
            />
          </div>
          <div class="flex gap-3">
            <SharedText tag="h4" txt="습도" class-name="text-white" />
            <SharedText
              tag="h4"
              :txt="`${humidity[index]} %`"
              class-name="text-white"
            />
          </div>
        </div>

        <div class="flex justify-between w-full">
          <SharedText
            tag="h4"
            txt="풍속 정보"
            class-name="text-white text-nowrap"
          />
          <div class="flex flex-col items-end w-full">
            <WindDirection
              tag="h4"
              :angle="Number(windDirection[index])"
              class-name="text-white"
            />
            <WindPower
              :power="Number(windSpeed[index])"
              class-name="text-white"
            />
            <SharedText
              tag="h5"
              :txt="
                windEastWest[index].includes('-')
                  ? `서 ${windEastWest[index]} m/s`
                  : `동 ${windEastWest[index]} m/s`
              "
              class-name="text-white"
            />
            <SharedText
              tag="h5"
              :txt="
                windNorthSouth[index].includes('-')
                  ? `남 ${windNorthSouth[index]} m/s`
                  : `북 ${windNorthSouth[index]} m/s`
              "
              class-name="text-white"
            />
          </div>
        </div>
        <div class="flex justify-between w-full">
          <SharedText tag="h4" txt="낙뢰" class-name="text-white" />
          <SharedText
            tag="h4"
            :txt="`${lighting[index]} kA`"
            class-name="text-white"
          />
        </div>
      </div>
    </section>
  </section>
</template>
