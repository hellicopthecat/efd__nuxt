export const geolocationErrorUtil = (error: GeolocationPositionError) => {
  if (error.PERMISSION_DENIED) alert("위치 엑세스 허용이 거절되었습니다.");
  if (error.POSITION_UNAVAILABLE) alert("지리적 위치 수집에 실패했습니다.");
  if (error.TIMEOUT) alert("지리적 위치를 확인하는데 시간이 초과되었습니다.");
};
