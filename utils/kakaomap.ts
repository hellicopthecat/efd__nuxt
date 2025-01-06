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
  map.relayout();
}

export function setCenter(map: any, lat: number, lng: number) {
  //@ts-ignore
  const moveLocation = new kakao.maps.LatLng(lat, lng);
  map.setCenter(moveLocation);
  map.relayout();
}

interface IPositionsObj {
  title: string;
  latlng: any;
}
export function multiMarker(map: any, positions: IPositionsObj[]) {
  let marker = [];
  //markerURL
  const imageSrc = "/safeHouse.png";
  for (let i = 0; i < positions.length; i++) {
    // 마커 이미지의 이미지 크기 입니다
    //@ts-ignore
    var imageSize = new kakao.maps.Size(35, 35);
    // 마커 이미지를 생성합니다
    //@ts-ignore
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    // 마커를 생성합니다

    marker.push(
      //@ts-ignore
      new kakao.maps.Marker({
        map: map,
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      })
    );
  }
  return marker;
}

export function zoomIn(map: any) {
  map.setLevel(1);
}
export function zoomOut(map: any) {
  map.setLevel(3);
}

export function markerClick({
  map,
  marker,
  lat,
  lng,
  domId,
  currentBtn,
}: {
  map: any;
  marker: any;
  lat: number;
  lng: number;
  domId: string;
  currentBtn: globalThis.Ref<string, string>;
}) {
  //@ts-ignore
  kakao.maps.event.addListener(marker, "click", function () {
    setCenter(map, lat, lng);
    zoomIn(map);
    currentBtn.value = domId;
    const targetBtn = document.getElementById(domId);
    if (targetBtn && targetBtn.parentElement) {
      targetBtn.parentElement.scrollTo({
        top: Number(targetBtn?.offsetTop) - 84,
        behavior: "smooth",
      });
    }
  });
}
