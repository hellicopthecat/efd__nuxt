<script setup lang="ts">
import Prepare from "~/components/disasterBag/Prepare.vue";
import BackPack from "~/components/iconComp/BackPack.vue";
import CenterPoket from "~/components/iconComp/backPackInfo/CenterPoket.vue";
import LeftPoket from "~/components/iconComp/backPackInfo/LeftPoket.vue";
import MainPoket from "~/components/iconComp/backPackInfo/MainPoket.vue";
import RightPoket from "~/components/iconComp/backPackInfo/RightPoket.vue";
import SharedText from "~/components/shared/SharedText.vue";
const centerPoketSwitch = ref(false);
const leftPoketSwitch = ref(false);
const rightPoketSwitch = ref(false);
const mainPoketSwitch = ref(false);
const mouseX = ref(0);
const mouseY = ref(0);

const handleCenterPoketSwitch = (emit: boolean) => {
  centerPoketSwitch.value = emit;
};
const handleLeftPoketSwitch = (emit: boolean) => {
  leftPoketSwitch.value = emit;
};
const handleRightPoketSwitch = (emit: boolean) => {
  rightPoketSwitch.value = emit;
};
const handleMainPoketSwitch = (emit: boolean) => {
  mainPoketSwitch.value = emit;
};
onMounted(() => {
  const container = document.getElementById("backPackCont");
  container?.addEventListener("mousemove", (e) => {
    mouseX.value = e.pageX;
    mouseY.value = e.pageY;
  });
});
</script>
<template>
  <div class="flex flex-col gap-5 p-10 w-full h-full">
    <div class="flex flex-col gap-5">
      <SharedText tag="h2" txt="재난대비가방" />
      <div
        id="backPackCont"
        class="self-center relative flex justify-center w-full h-full z-[70]"
      >
        <div>
          <BackPack
            @center-poket-switch="handleCenterPoketSwitch"
            @left-poket-switch="handleLeftPoketSwitch"
            @right-poket-switch="handleRightPoketSwitch"
            @main-poket-switch="handleMainPoketSwitch"
          />
        </div>
        <RightPoket
          :switch="rightPoketSwitch"
          :mouse-x="mouseX"
          :mouse-y="mouseY"
        />
        <LeftPoket
          :switch="leftPoketSwitch"
          :mouse-x="mouseX"
          :mouse-y="mouseY"
        />
        <MainPoket
          :switch="mainPoketSwitch"
          :mouse-x="mouseX"
          :mouse-y="mouseY"
        />
        <CenterPoket
          :switch="centerPoketSwitch"
          :mouse-x="mouseX"
          :mouse-y="mouseY"
        />
      </div>
    </div>
    <Prepare />
  </div>
</template>
