<script setup lang="ts">
import WeatherSpecialComp from "~/components/weatherComp/weatherSpecialNotice/WeatherSpecialComp.vue";
import type {IDefaultSafetyDataTypes} from "~/types/apiType";
import type {IWeatherSpecialNoticeType} from "~/types/weather/weatherTypes";

//slide
const slideNum = ref(0);
// pagination
const pageNo = ref(1);
const startOffSet = ref(0);
const endOffSet = ref(10);
const totalPage = ref(0);
const totalPagesArray = computed(() =>
  Array.from({length: totalPage.value}, (_, i) => i + 1)
);

//data
const {data, status, refresh} = useAsyncData(
  "weatherSpecial",
  async () =>
    await $fetch<IDefaultSafetyDataTypes<IWeatherSpecialNoticeType>>(
      "/api/weather/weatherSpecialNotice",
      {
        query: {
          pageNo: pageNo.value,
        },
      }
    )
);
watch(data, () => {
  if (data.value) {
    const {numOfRows, pageNo: pageNum, totalCount} = data.value;
    pageNo.value = Number(pageNum);
    totalPage.value = Math.floor(Number(totalCount) / Number(numOfRows));
  }
});
//fn
const leftClick = () => {
  if (slideNum.value >= 9) {
    slideNum.value = 0;
  } else {
    slideNum.value++;
  }
  const weatherSpecialCont = document.getElementById("weatherSpecial");
  if (weatherSpecialCont) {
    weatherSpecialCont.style.left = `-${slideNum.value * 100}%`;
  }
};
const rightClick = () => {
  if (slideNum.value <= 0) {
    slideNum.value = 9;
  } else {
    slideNum.value--;
  }
  const weatherSpecialCont = document.getElementById("weatherSpecial");
  if (weatherSpecialCont) {
    weatherSpecialCont.style.left = `-${slideNum.value * 100}%`;
  }
};
const currentPageClick = async (index: string) => {
  pageNo.value = Number(index);
  await refresh();
};
const prevOffset = async () => {
  if (startOffSet.value <= 0) {
    startOffSet.value = 0;
    endOffSet.value = 10;
    pageNo.value = 1;
  } else {
    startOffSet.value = startOffSet.value - 10;
    endOffSet.value = endOffSet.value - 10;
    pageNo.value = startOffSet.value - 1;
  }
  await refresh();
};
const nextOffset = async () => {
  if (endOffSet.value >= totalPage.value) {
    startOffSet.value = totalPage.value - 10;
    endOffSet.value = totalPage.value;
    pageNo.value = totalPage.value;
  } else {
    startOffSet.value = startOffSet.value + 10;
    endOffSet.value = endOffSet.value + 10;
    pageNo.value = startOffSet.value + 1;
  }
  await refresh();
};
</script>
<template>
  <div class="flex flex-col items-center p-10 h-full gap-10">
    <div class="flex self-start items-end gap-5">
      <SharedText tag="h2" txt="기상특보" class-name="text-white" />
      <SharedText tag="h4" txt="(최근 10개)" class-name="text-white/75" />
    </div>

    <div class="flex items-center self-center w-full h-full">
      <button @click="leftClick">
        <Icon
          name="heroicons:chevron-left-16-solid"
          class="hover:text-warnYellow text-white size-32"
        />
      </button>
      <!-- data -->
      <div class="w-full overflow-hidden">
        <ul
          id="weatherSpecial"
          class="relative flex w-[1000%] transition-all ease-in-out duration-500"
        >
          <li
            v-for="(weather, index) in data?.body"
            :key="`special:${weather.PRSNTN_SN}`"
            class="w-full"
          >
            <WeatherSpecialComp :weather="weather" />
          </li>
        </ul>
      </div>
      <button @click="rightClick">
        <Icon
          name="heroicons:chevron-right-16-solid"
          class="hover:text-warnYellow text-white size-32"
        />
      </button>
    </div>
    <!-- pagination -->
    <div class="flex items-center gap-10">
      <button @click="prevOffset" class="size-7">
        <Icon name="mdi:chevron-left" class="size-7" />
      </button>
      <ul class="flex gap-5">
        <li v-for="page in totalPagesArray.slice(startOffSet, endOffSet)">
          <button @click="currentPageClick(String(page))" class="size-7">
            {{ page }}
          </button>
        </li>
      </ul>
      <button @click="nextOffset" class="size-7">
        <Icon name="mdi:chevron-right" class="size-7" />
      </button>
    </div>
  </div>
</template>
