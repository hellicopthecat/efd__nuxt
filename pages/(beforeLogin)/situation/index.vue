<script setup lang="ts">
import type {ISituationTypes} from "~/types/situationType";

const {data} = await useAsyncData<ISituationTypes>(
  "situationNotice",
  async () => await $fetch(`/api/disasterMsg/situationNotice`)
);
</script>
<template>
  <div class="text-white">
    <SharedText tag="h2" txt="현 재난상황 전파" class-name="text-white" />
    <ClientOnly>
      <div v-if="data" class="flex">
        <section
          v-for="(situation, index) in data.MisfortuneSituationNoticeMsg[1].row"
        >
          <SharedText
            tag="h3"
            :txt="`${index + 1}. ${situation.titl}`"
            class-name="text-white"
          />
          <div v-html="situation.cnts1" class="bg-white w-dvw"></div>
        </section>
      </div>
    </ClientOnly>
  </div>
</template>
