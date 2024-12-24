export async function initializeMap(
  lat: number,
  lon: number,
  createMarker = true
) {
  let load = true;
  let map;
  let myPosition;
  const initMap = useKakaoMap();
  //@ts-ignore
  await kakao.maps.load(async () => {
    const container = document.getElementById("map");
    //@ts-ignore
    myPosition = new kakao.maps.LatLng(lat, lon);
    const options = {
      center: myPosition,
      level: 3,
    };
    //@ts-ignore
    map = await new kakao.maps.Map(container, options);
    initMap.value = map;
    load = false;
    if (createMarker) {
      const {marker} = makeMarker(myPosition);
      marker.setMap(map);
    }
  });

  return {map, myPosition, load};
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
  map.panTo(moveLatLon);
}

export function setCenter(map: any, lat: number, lng: number) {
  //@ts-ignore
  const moveLocation = new kakao.maps.LatLng(lat, lng);
  map.setCenter(moveLocation);
}

interface IPositionsObj {
  title: string;
  latlng: any;
}
export function multiMarker(map: any, positions: IPositionsObj[]) {
  let marker: any;
  //markerURL
  const imageSrc = "/safehouse.png";
  for (let i = 0; i < positions.length; i++) {
    // 마커 이미지의 이미지 크기 입니다
    //@ts-ignore
    var imageSize = new kakao.maps.Size(35, 35);
    // 마커 이미지를 생성합니다
    //@ts-ignore
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    // 마커를 생성합니다

    //@ts-ignore
    marker = new kakao.maps.Marker({
      map: map,
      position: positions[i].latlng, // 마커를 표시할 위치
      title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      image: markerImage, // 마커 이미지
    });
  }
}
