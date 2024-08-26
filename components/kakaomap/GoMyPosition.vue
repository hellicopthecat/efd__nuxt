<script setup lang="ts">
import {panTo} from "~/utils/kakaomap";
const lat = ref();
const lng = ref();
const initMap = useKakaoMap();
onMounted(() => {
  navigator.geolocation.getCurrentPosition(({coords}) => {
    lat.value = coords.latitude;
    lng.value = coords.longitude;
  });
});
</script>
<template>
  <button
    @click="panTo(initMap, lat, lng)"
    class="absolute z-50 bottom-10 right-10 bg-darkBlue size-[5%] rounded-xl flex justify-center items-center"
  >
    <UIcon
      name="i-heroicons:map-pin-16-solid"
      class="size-[50%] bg-warnYellow"
    />
  </button>
</template>
