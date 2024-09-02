export function initializeMap(lat: number, lon: number, createMarker = true) {
  const initMap = useKakaoMap();
  let map;
  let myPosition;

  //@ts-ignore
  kakao.maps.load(async () => {
    const container = document.getElementById("map");
    //@ts-ignore
    myPosition = new kakao.maps.LatLng(lat, lon);
    const options = {
      center: myPosition,
      level: 3,
    };
    //@ts-ignore
    map = await new kakao.maps.Map(container, options);
    if (createMarker) {
      const {marker} = makeMarker(myPosition);
      marker.setMap(map);
    }

    initMap.value = map;
  });
  return {map, myPosition};
}
export function makeMarker(position: any) {
  const imageSrc = "/pin.png",
    //@ts-ignore
    imgageSize = new kakao.maps.Size(39, 69),
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

export function panTo(map: any, lat: number, lng: number) {
  //@ts-ignore
  const moveLatLon = new kakao.maps.LatLng(lat, lng);
  //@ts-ignore
  map.panTo(moveLatLon);
}
