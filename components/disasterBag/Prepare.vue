<script setup lang="ts">
import SharedText from "../shared/SharedText.vue";
import FirstPrepare from "./FirstPrepare.vue";
import FourthPrepare from "./FourthPrepare.vue";
import SecondPrepare from "./SecondPrepare.vue";
import ThirdPrepare from "./ThirdPrepare.vue";
const firstTab = ref(false);
const secondTab = ref(false);
const thirdTab = ref(false);
const fourthTab = ref(false);
const handlefirstTabClick = () => {
  firstTab.value = !firstTab.value;
  secondTab.value = false;
  thirdTab.value = false;
  fourthTab.value = false;
};
const handlesecondTabClick = () => {
  firstTab.value = false;
  secondTab.value = !secondTab.value;
  thirdTab.value = false;
  fourthTab.value = false;
};
const handlethirdTabClick = () => {
  firstTab.value = false;
  secondTab.value = false;
  thirdTab.value = !thirdTab.value;
  fourthTab.value = false;
};
const handlefourthTabClick = () => {
  firstTab.value = false;
  secondTab.value = false;
  thirdTab.value = false;
  fourthTab.value = !fourthTab.value;
};
</script>
<template>
  <div class="self-start flex flex-col gap-5">
    <SharedText tag="h2" txt="비상대비용품" />
    <ul
      class="flex flex-col border rounded-md px-5 *:px-3 *:py-5 *:border-b last:*:border-0 *:flex *:flex-col"
    >
      <!-- 꼭 기억해두세요 -->
      <li class="*:transition *:duration-300 *:ease-in-out *:origin-top">
        <div class="flex justify-between items-center">
          <SharedText tag="h3" txt="꼭 기억해두세요" />
          <button
            @click="handlefirstTabClick"
            :class="firstTab ? 'rotate-180' : 'rotate-0'"
            class="trasition duration-300 ease-in-out"
          >
            <Icon name="mdi:triangle-down" size="30" />
          </button>
        </div>
        <ul
          :class="
            !firstTab
              ? 'scale-y-0 h-0 flex flex-col gap-3 px-5 list-decimal'
              : 'scale-y-100 h-full flex flex-col gap-3 px-5 list-decimal '
          "
        >
          <FirstPrepare />
        </ul>
      </li>

      <!-- 손에 들고 가야할 것 -->
      <li class="*:transition *:duration-300 *:ease-in-out *:origin-top">
        <div class="flex justify-between items-center">
          <SharedText tag="h3" txt="손에 들고 가야할 것" />
          <button
            @click="handlesecondTabClick"
            :class="secondTab ? 'rotate-180' : 'rotate-0'"
            class="trasition duration-300 ease-in-out"
          >
            <Icon name="mdi:triangle-down" size="30" />
          </button>
        </div>
        <ul
          :class="
            !secondTab
              ? 'scale-y-0 h-0 flex flex-col gap-3 px-5 list-decimal'
              : 'scale-y-100 h-full flex flex-col gap-3 px-5 list-decimal'
          "
        >
          <SecondPrepare />
        </ul>
      </li>

      <!-- 집에 비치할 것 -->
      <li class="*:transition *:duration-300 *:ease-in-out *:origin-top">
        <div class="flex justify-between items-center">
          <SharedText tag="h3" txt="집에 비치할 것" />
          <button
            @click="handlethirdTabClick"
            :class="thirdTab ? 'rotate-180' : 'rotate-0'"
            class="trasition duration-300 ease-in-out"
          >
            <Icon name="mdi:triangle-down" size="30" />
          </button>
        </div>
        <ul
          :class="
            !thirdTab
              ? 'scale-y-0 h-0 flex flex-col gap-3 px-5 list-decimal'
              : 'scale-y-100 h-full flex flex-col gap-3 px-5 list-decimal'
          "
        >
          <ThirdPrepare />
        </ul>
      </li>

      <!-- 이것도 놓치지마세요 -->
      <li class="*:transition *:duration-300 *:ease-in-out *:origin-top">
        <div class="flex justify-between items-center">
          <SharedText tag="h3" txt="이것도 놓치지마세요" />
          <button
            @click="handlefourthTabClick"
            :class="fourthTab ? 'rotate-180' : 'rotate-0'"
            class="trasition duration-300 ease-in-out"
          >
            <Icon name="mdi:triangle-down" size="30" />
          </button>
        </div>
        <ul
          :class="
            !fourthTab
              ? 'scale-y-0 h-0 flex flex-col gap-3 px-5 list-decimal'
              : 'scale-y-100 h-full flex flex-col gap-3 px-5 list-decimal'
          "
        >
          <FourthPrepare />
        </ul>
      </li>
    </ul>
  </div>
</template>
