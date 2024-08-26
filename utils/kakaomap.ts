export function panTo(map: any, lat: number, lng: number) {
  //@ts-ignore
  const moveLatLon = new kakao.maps.LatLng(lat, lng);
  //@ts-ignore
  map.panTo(moveLatLon);
}

export function makeMarker(position: any) {
  const imageSrc = "/pin.png",
    //@ts-ignore
    imgageSize = new kakao.maps.Size(39, 73),
    //@ts-ignore
    imageOption = {offset: new kakao.maps.Point(18, 69)};
  //@ts-ignore
  const markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imgageSize,
    imageOption
  );
  //@ts-ignore
  const marker = new kakao.maps.Marker({
    position: position,
    image: markerImage,
  });
  return {marker};
}
