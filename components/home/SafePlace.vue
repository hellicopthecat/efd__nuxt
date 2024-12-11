<script setup lang="ts">
import type {ISafeAreaTypes} from "~/types/safeArea/safeAreaTyeps";
import SharedText from "../shared/SharedText.vue";
import {panTo} from "~/utils/kakaomap";
const initMap = useKakaoMap();
const toggleSafePlace = ref(true);
const safePlaceData = ref<ISafeAreaTypes[]>([]);

const toggleContainer = () => (toggleSafePlace.value = !toggleSafePlace.value);

onMounted(async () => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const data = await $fetch<ISafeAreaTypes[]>("/api/home/safeArea", {
      query: {lat: position.coords.latitude, lon: position.coords.longitude},
    });
    safePlaceData.value = data;

    const dataArr = [] as any[];
    data.forEach((value) => {
      const data = {
        title: value.REARE_NM,
        //@ts-ignore
        latlng: new kakao.maps.LatLng(value.LAT, value.LOT),
      };
      dataArr.push(data);
    });
    multiMarker(initMap.value, dataArr);
  });
});
</script>
<template>
  <div
    v-if="initMap"
    class="absolute left-10 top-10 z-50 bg-black/75 p-5 rounded-lg overflow-hidden flex flex-col"
    :class="toggleSafePlace ? 'gap-5' : ''"
  >
    <div
      class="flex items-center cursor-pointer"
      :class="toggleSafePlace ? 'gap-5' : ''"
      @click.prevent="toggleContainer"
    >
      <button class="size-10">
        <Icon name="mdi:info" class="size-10" />
      </button>

      <SharedText
        tag="h3"
        txt="근처 대피소 정보"
        :class-name="
          toggleSafePlace
            ? 'origin-left transition ease-in-out duration-200 scale-x-full w-full text-nowrap'
            : 'origin-left transition ease-in-out duration-200 scale-x-0 w-0 text-nowrap'
        "
      />
    </div>
    <div
      class="overflow-y-scroll flex flex-col gap-4 origin-top-left transition ease-in-out duration-200"
      :class="toggleSafePlace ? 'scale-full w-80 h-96 ' : 'scale-0 size-0'"
    >
      <button
        v-for="area in safePlaceData"
        :key="area.MNG_SN"
        @click.prevent="panTo(initMap, area.LAT, area.LOT)"
        class="flex flex-col gap-1 p-4 mr-4 bg-slate-700 hover:bg-slate-500 rounded-md"
      >
        <div class="flex gap-3">
          <SharedText
            v-for="shelter in area.SHLT_SE_NM.split(',')"
            tag="p"
            :txt="shelter"
            class-name="bg-teal-700 px-2 py-1 rounded-md"
          />
        </div>
        <SharedText tag="h4" :txt="area.REARE_NM" />
        <SharedText tag="small" :txt="area.RONA_DADDR" />
      </button>
    </div>
  </div>
</template>
