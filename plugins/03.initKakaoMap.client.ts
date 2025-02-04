export default defineNuxtPlugin(() => {
  return {
    provide: {
      initKakaoMap: async (lat: number, lon: number, createMarker = true) => {
        let map;
        let myPosition;
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
          if (createMarker) {
            const {marker} = makeMarker(myPosition);
            marker.setMap(map);
          }
        });
        return {map, myPosition};
      },
    },
  };
});
