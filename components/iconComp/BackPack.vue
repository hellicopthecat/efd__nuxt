<script setup lang="ts">
const emit = defineEmits([
  "leftPoketSwitch",
  "centerPoketSwitch",
  "rightPoketSwitch",
  "mainPoketSwitch",
]);

const handleCenterPoketSwitchOn = () => {
  emit("centerPoketSwitch", true);
};
const handleCenterPoketSwitchOff = () => {
  emit("centerPoketSwitch", false);
};
const handleLeftPoketSwitchOn = () => {
  emit("leftPoketSwitch", true);
};
const handleLeftPoketSwitchOff = () => {
  emit("leftPoketSwitch", false);
};
const handleRightPoketSwitchOn = () => {
  emit("rightPoketSwitch", true);
};
const handleRightPoketSwitchOff = () => {
  emit("rightPoketSwitch", false);
};
const handleMainPoketSwitchOn = () => {
  emit("mainPoketSwitch", true);
};
const handleMainPoketSwitchOff = () => {
  emit("mainPoketSwitch", false);
};
</script>
<template>
  <svg
    viewBox="0 0 1651 1932"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xml:space="preserve"
    xmlns:serif="http://www.serif.com/"
    style="
      fill-rule: evenodd;
      clip-rule: evenodd;
      stroke-linejoin: round;
      stroke-miterlimit: 2;
    "
    class="size-[100%]"
  >
    <rect
      id="Artboard1"
      x="0"
      y="0"
      width="1650.31"
      height="1931.24"
      style="fill: none"
    />
    <clipPath id="_clip1">
      <rect x="0" y="0" width="1650.31" height="1931.24" />
    </clipPath>
    <g clip-path="url(#_clip1)" class="hover:*:brightness-50">
      <!-- main poket -->
      <g
        @mouseover="handleMainPoketSwitchOn"
        @mouseout="handleMainPoketSwitchOff"
      >
        <path
          d="M521.518,303.313c-6.217,-18.798 -9.519,-38.473 -9.519,-58.73c0,-132.531 141.337,-240.128 315.423,-240.128c174.087,-0 315.423,107.597 315.423,240.128c0,20.257 -3.302,39.932 -9.518,58.73l-77.361,-0c8.185,-18.443 12.623,-38.195 12.623,-58.73c0,-101.331 -108.063,-183.598 -241.167,-183.598c-133.103,0 -241.167,82.267 -241.167,183.598c0,20.535 4.438,40.287 12.623,58.73l-77.36,-0Z"
          style="fill: #d8d8d8"
        />
        <g>
          <path
            d="M970.576,168.55c248.857,-0 450.596,201.739 450.596,450.597c0,427.905 0,1035.19 0,1238.94c0,18.48 -7.341,36.204 -20.409,49.271c-13.067,13.068 -30.791,20.409 -49.271,20.409c-210.409,0 -837.731,0 -1048.14,0c-18.481,0 -36.204,-7.341 -49.272,-20.409c-13.067,-13.067 -20.409,-30.791 -20.409,-49.271c0,-203.751 0,-811.04 0,-1238.94c0,-248.858 201.739,-450.597 450.597,-450.597c93.748,-0 192.559,-0 286.307,-0Z"
            style="fill: #ebebeb"
          />
          <path
            d="M1407.2,1832.66c1.899,5.879 2.923,12.133 2.923,18.617c0,34.347 -28.735,62.232 -64.128,62.232c-2.914,0 -5.782,-0.189 -8.593,-0.555c39.259,-4.379 69.827,-37.717 69.827,-78.137c-0,-0.721 -0.01,-1.44 -0.029,-2.157Z"
            style="fill: #fff"
          />
        </g>
        <path
          d="M303.623,966.114l-0,-371.851c-0,-188.905 177.972,-342.042 397.511,-342.042l252.576,-0c219.54,-0 397.512,153.137 397.512,342.042l-0,371.851l-25.032,-0l0,-354.071c0,-89.978 -31.721,-184.208 -105.663,-247.832c-73.942,-63.625 -184.756,-92.525 -289.326,-92.525l-208.265,-0.839c-104.57,-0 -213.174,33.005 -287.116,96.629c-73.942,63.624 -107.166,154.589 -107.166,244.567l0,354.071l-25.031,-0Z"
          style="fill: #a7a7a7"
        />
      </g>

      <!-- front poket -->
      <g
        @mouseover="handleCenterPoketSwitchOn"
        @mouseout="handleCenterPoketSwitchOff"
      >
        <path
          d="M1266.81,1109.33c18.516,0 36.274,7.356 49.367,20.449c13.093,13.092 20.448,30.85 20.448,49.366c0,135.592 0,433.112 0,568.704c-0,18.516 -7.355,36.273 -20.448,49.366c-13.093,13.093 -30.851,20.449 -49.367,20.449c-185.586,-0 -689.616,-0 -875.202,-0c-18.516,-0 -36.273,-7.356 -49.366,-20.449c-13.093,-13.093 -20.449,-30.85 -20.449,-49.366c0,-135.592 0,-433.112 0,-568.704c0,-18.516 7.356,-36.274 20.449,-49.366c13.093,-13.093 30.85,-20.449 49.366,-20.449c185.586,0 689.616,0 875.202,0Z"
          style="fill: #d8d8d8"
        />
        <path
          d="M1258.3,1260.2l-936.507,-0l0,-23.33l1014.83,-0l0,23.33l-52.787,-0l-0,116.238l-25.538,0l-0,-116.238Z"
          style="fill: #7e7e7e"
        />
        <path
          d="M1319.67,1720.46c1.9,5.879 2.924,12.132 2.924,18.616c-0,34.347 -28.735,62.233 -64.128,62.233c-2.914,-0 -5.783,-0.189 -8.594,-0.555c39.26,-4.38 69.828,-37.717 69.828,-78.138c-0,-0.721 -0.01,-1.44 -0.03,-2.156Z"
          style="fill: #fff"
        />
      </g>
      <!-- left poket -->
      <g
        @mouseover="handleLeftPoketSwitchOn"
        @mouseout="handleLeftPoketSwitchOff"
      >
        <path
          d="M212.839,1109.33l-0,708.334l-132.234,-0c-20.183,-0 -39.539,-8.018 -53.81,-22.289c-14.272,-14.272 -22.289,-33.628 -22.289,-53.811c-0,-136.169 -0,-419.965 -0,-556.135c-0,-20.182 8.017,-39.538 22.289,-53.81c14.271,-14.271 33.627,-22.289 53.81,-22.289c59.513,0 132.234,0 132.234,0Z"
          style="fill: #d8d8d8"
        />
        <rect
          x="5.872"
          y="1236.87"
          width="123.638"
          height="20.916"
          style="fill: #7e7e7e"
        />
      </g>
      <!-- right poket -->
      <g
        @mouseover="handleRightPoketSwitchOn"
        @mouseout="handleRightPoketSwitchOff"
      >
        <path
          d="M1442.01,1817.66l-0,-708.334l132.234,0c20.182,0 39.539,8.018 53.81,22.289c14.271,14.272 22.289,33.628 22.289,53.81c-0,136.17 -0,419.966 -0,556.135c-0,20.183 -8.018,39.539 -22.289,53.811c-14.271,14.271 -33.628,22.289 -53.81,22.289c-59.513,-0 -132.234,-0 -132.234,-0Z"
          style="fill: #d8d8d8"
        />
        <path
          d="M1535.71,1257.79l-9.013,0l0,-20.916l123.638,-0l-0,20.916l-104.167,0l0,48.868l-10.458,0l0,-48.868Z"
          style="fill: #7e7e7e"
        />
        <path
          d="M1635.35,1720.46c1.899,5.879 2.923,12.132 2.923,18.616c0,34.347 -28.735,62.233 -64.128,62.233c-2.914,-0 -5.782,-0.189 -8.593,-0.555c39.26,-4.38 69.827,-37.717 69.827,-78.138c-0,-0.721 -0.01,-1.44 -0.029,-2.156Z"
          style="fill: #fff"
        />
      </g>
    </g>
  </svg>
</template>
