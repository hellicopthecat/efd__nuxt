import type {IAddressData} from "~/types/address/addressType";

export function onMountAddress() {
  const script = document.createElement("script");
  script.setAttribute("id", "addressScript");
  script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  document.body.appendChild(script);
}
export function unMountAddress() {
  const addressScript = document.getElementById("addressScript");
  if (addressScript) addressScript.remove();
}

export function clickPostCode(value: IAddressData) {
  //@ts-ignore
  new daum.Postcode({
    oncomplete: function (data: IAddressData) {
      value.sido = data.sido;
      value.sigungu = data.sigungu;
      value.bname = data.bname;
      value.bname1 = data.bname1;
      value.roadAddress = data.roadAddress;
      value.buildingName = data.buildingName;
      value.zonecode = data.zonecode;
    },
  }).open();
}
