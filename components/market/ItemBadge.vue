<script setup lang="ts">
import SharedText from "../shared/SharedText.vue";
interface ItemBadgeType {
  complete: boolean;
  itemSido: string;
  itemSigungu: string;
  itemRoadAdress: string;
}
const {complete, itemSido, itemSigungu, itemRoadAdress} =
  defineProps<ItemBadgeType>();
const router = useRouter();
const goBack = () => router.push("/market");
</script>
<template>
  <div class="flex items-center gap-3 *:px-2 *:py-1 *:rounded-lg *:text-nowrap">
    <button @click.prevent="goBack" class="flex justify-center items-center">
      <Icon name="mdi:chevron-left" class="size-8" />
    </button>
    <div :class="complete ? 'bg-gray-300' : 'bg-green-500'">
      <SharedText tag="h5" :txt="complete ? '판매완료' : '판매중'" />
    </div>
    <SharedText tag="h5" :txt="itemSido" :class-name="'bg-slate-600'" />
    <SharedText tag="h5" :txt="itemSigungu" :class-name="'bg-slate-600'" />
    <SharedText tag="h5" :txt="itemRoadAdress" :class-name="'bg-slate-600'" />
  </div>
</template>
