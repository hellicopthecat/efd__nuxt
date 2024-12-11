<script setup lang="ts">
import type {ItemTypes} from "~/types/market/itemType";
import SharedText from "../shared/SharedText.vue";
//hooks
const route = useRoute();
const router = useRouter();
const {data} = useNuxtData<ItemTypes>(`item${route.params.id}`);
//state
const itemName = ref<string | undefined>(data.value?.itemName || "");
const itemPrice = ref<string | undefined>(data.value?.itemPrice || "");
const itemDesc = ref<string | undefined>(data.value?.itemDesc || "");
//fn
const submitEditProduct = async () => {
  const {data: result, error} = await useFetch("/api/market/editItem", {
    method: "POST",
    query: {
      id: data.value?.id,
      itemName: itemName.value,
      itemPrice: itemPrice.value,
      itemDesc: itemDesc.value,
    },
  });
  if (!result.value?.ok) {
    alert(error.value?.message);
  } else {
    if (data.value) {
      data.value.itemName = itemName.value + "";
      data.value.itemPrice = itemPrice.value + "";
      data.value.itemDesc = itemDesc.value + "";
    }
    router.push({query: {modal: undefined}});
  }
};

const closeModal = () => router.push({query: {modal: undefined}});
</script>
<template>
  <div
    class="absolute left-0 right-0 z-[99] mx-auto bg-slate-800 w-[50%] h-[50%] p-10 rounded-lg"
  >
    <form class="flex flex-col gap-5 h-full">
      <div class="flex flex-col gap-2">
        <label for="itemName" class="flex items-center gap-3">
          <div class="size-4 bg-blue-700 rounded-full" />
          <SharedText tag="h4" txt="상품명" />
        </label>
        <input
          id="itemName"
          type="text"
          :placeholder="data?.itemName"
          :value="itemName"
          @change="(event) =>  itemName = (event.target as HTMLInputElement).value"
          class="rounded-md px-5 py-3 bg-slate-600"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="itemPrice" class="flex items-center gap-3">
          <div class="size-4 bg-blue-700 rounded-full" />
          <SharedText tag="h4" txt="상품가격 및 교환품목" />
        </label>
        <input
          id="itemPrice"
          type="text"
          :placeholder="data?.itemPrice"
          :value="itemPrice"
          @change="(event) =>  itemPrice = (event.target as HTMLInputElement).value"
          class="rounded-md px-5 py-3 bg-slate-600"
        />
      </div>
      <div class="flex flex-col gap-2 h-full">
        <label for="itemDesc" class="flex items-center gap-3">
          <div class="size-4 bg-blue-700 rounded-full" />
          <SharedText tag="h4" txt="상품설명" />
        </label>
        <textarea
          id="itemDesc"
          type="text"
          :placeholder="data?.itemDesc"
          :value="itemDesc"
          @change="(event) =>  itemDesc = (event.target as HTMLInputElement).value"
          class="rounded-md px-5 py-3 h-full bg-slate-600"
        ></textarea>
      </div>
      <div class="flex justify-center gap-5">
        <button
          @click.prevent="submitEditProduct"
          class="bg-warnYellow text-darkBlue px-3 py-2 rounded-md"
        >
          변경
        </button>
        <button
          type="button"
          @click.prevent="closeModal"
          class="bg-warnYellow text-darkBlue px-3 py-2 rounded-md"
        >
          취소
        </button>
      </div>
    </form>
  </div>
</template>
