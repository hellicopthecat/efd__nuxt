<script setup lang="ts">
import type {ISituationTypes} from "~/types/situationType";
const situationCont = ref<HTMLElement | null>(null);
const slideNum = ref(0);
const data = await $fetch<ISituationTypes>(`/api/disasterMsg/situationNotice`);

const leftClick = () => {
  if (slideNum.value <= 0) {
    slideNum.value = data.MisfortuneSituationNoticeMsg[1].row.length - 1;
    const width = situationCont.value!.clientWidth * slideNum.value;
    situationCont.value!.style.transform = `translateX(-${width}px)`;
  } else {
    slideNum.value -= 1;
    const width = situationCont.value!.clientWidth * slideNum.value;
    situationCont.value!.style.transform = `translateX(-${width}px)`;
  }
};
const rightClick = () => {
  if (slideNum.value >= 9) {
    slideNum.value = 0;
    situationCont.value!.style.transform = `translateX(-${0}px)`;
  } else {
    slideNum.value += 1;
    const width = situationCont.value!.clientWidth * slideNum.value;
    situationCont.value!.style.transform = `translateX(-${width}px)`;
  }
};
</script>
<template>
  <div class="flex flex-col p-10 h-full gap-10">
    <div class="flex items-end gap-5">
      <SharedText tag="h2" txt="현 재난상황 전파" class-name="text-white" />
      <SharedText tag="h4" txt="(최근 10개)" class-name="text-white/75" />
    </div>

    <div class="flex items-center self-center w-full h-full">
      <button @click="leftClick">
        <Icon
          name="heroicons:chevron-left-16-solid"
          class="hover:text-warnYellow text-white size-32"
        />
      </button>

      <div class="overflow-x-hidden rounded-lg">
        <div
          ref="situationCont"
          class="flex transition-all duration-300 ease-in-out"
        >
          <ClientOnly>
            <section
              v-if="data"
              v-for="(situation, index) in data.MisfortuneSituationNoticeMsg[1]
                .row"
              class="bg-white p-4 min-w-full flex flex-col gap-5"
            >
              <SharedText
                tag="h3"
                :txt="`${index + 1}. ${situation.titl}`"
                class-name=""
              />
              <div v-html="situation.cnts1" class="*:w-full *:text-black"></div>
            </section>
          </ClientOnly>
        </div>
      </div>

      <button @click="rightClick">
        <Icon
          name="heroicons:chevron-right-16-solid"
          class="hover:text-warnYellow text-white size-32"
        />
      </button>
    </div>
  </div>
</template>
