export const palaceLat = 37.5759;
export const palaceLng = 126.9768;
export const geolocationErrorUtil = async (error: GeolocationPositionError) => {
  const initmap = useKakaoMap();
  const {$initKakaoMap} = useNuxtApp();
  if (error.PERMISSION_DENIED) {
    alert(
      "위치 엑세스 허용이 거절되었습니다. 브라우저 설정에서 위치 엑세스를 허용해주세요"
    );
    const {map} = await $initKakaoMap(palaceLat, palaceLng, true);
    initmap.value = map;

    return;
  }
  if (error.POSITION_UNAVAILABLE) {
    alert("지리적 위치 수집에 실패했습니다.");
    return;
  }
  if (error.TIMEOUT) {
    alert("지리적 위치를 확인하는데 시간이 초과되었습니다.");
    return;
  }
};
