<script setup lang="ts">
import type {ISafeAreaTypes} from "~/types/safeArea/safeAreaTyeps";
import SharedText from "../shared/SharedText.vue";
import {zoomIn, setCenter} from "~/utils/kakaomap";
import {geolocationErrorUtil} from "~/utils/geolocations/locationUtil";
interface IDataArrTypes {
  id: string;
  title: string;
  latlng: {Ma: number; La: number};
}
const initMap = useKakaoMap();
const currentBtn = useCurrentBtnId();

const toggleSafePlace = ref(true);
const safePlaceData = ref<ISafeAreaTypes[]>([]);

const toggleContainer = () => {
  toggleSafePlace.value = !toggleSafePlace.value;
  currentBtn.value = "";
};
const goPosition = (map: any, lat: number, lot: number, btnId: string) => {
  currentBtn.value = btnId;
  setCenter(map, lat, lot);
  zoomIn(map);
};
onMounted(async () => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const data = await $fetch<ISafeAreaTypes[]>("/api/home/safeArea", {
      query: {lat: position.coords.latitude, lon: position.coords.longitude},
    });
    safePlaceData.value = data;

    const dataArr = [] as IDataArrTypes[];
    data.forEach((value) => {
      const data = {
        id: value.MNG_SN,
        title: value.REARE_NM,
        //@ts-ignore
        latlng: new kakao.maps.LatLng(value.LAT, value.LOT),
      };
      dataArr.push(data);
    });

    const marker = multiMarker(initMap.value, dataArr);
    for (let index = 0; index < marker.length; index++) {
      const lat = dataArr[index].latlng.Ma;
      const lng = dataArr[index].latlng.La;
      const domId = dataArr[index].id;
      markerClick({
        map: initMap.value,
        marker: marker[index],
        lat,
        lng,
        domId,
        currentBtn: currentBtn,
      });
    }
  }, geolocationErrorUtil);
});
</script>
<template>
  <div
    v-if="initMap"
    class="absolute w-full rounded-b-xl xl:left-10 xl:top-10 z-40 bg-black/75 p-5 xl:rounded-lg overflow-hidden flex flex-col"
    :class="toggleSafePlace ? 'gap-5  xl:w-96' : 'xl:w-32'"
  >
    <div class="flex items-center cursor-pointer justify-between">
      <div class="flex items-center" :class="toggleSafePlace && 'gap-5'">
        <button class="size-10" @click.prevent="toggleContainer">
          <Icon name="mdi:info" class="size-10" />
        </button>

        <SharedText
          tag="h3"
          txt="근처 대피소 정보"
          :class-name="
            toggleSafePlace
              ? 'origin-left transition ease-in-out duration-300 opacity-1 scale-x-full w-full text-nowrap'
              : 'origin-left transition ease-in-out duration-300 opacity-0 scale-x-0 w-0 text-nowrap'
          "
        />
      </div>
      <button class="size-10" @click.prevent="toggleContainer">
        <Icon
          name="mdi:chevron-left"
          class="size-10 transition ease-in-out duration-500"
          :class="toggleSafePlace ? 'rotate-0' : '-rotate-90'"
        />
      </button>
    </div>
    <div
      class="overflow-y-scroll flex flex-col gap-4 origin-top-left transition ease-in-out duration-500"
      :class="
        toggleSafePlace
          ? 'scale-full h-32 xl:w-80 xl:h-96 opacity-1 '
          : 'scale-0 size-0 opacity-0'
      "
    >
      <button
        v-for="area in safePlaceData"
        :id="area.MNG_SN"
        :key="area.MNG_SN"
        @click.prevent="goPosition(initMap, area.LAT, area.LOT, area.MNG_SN)"
        class="flex flex-col gap-1 p-4 mr-4 bg-slate-700 hover:bg-slate-500 rounded-md"
        :class="currentBtn === area.MNG_SN ? 'border-2 border-red-500' : ''"
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
