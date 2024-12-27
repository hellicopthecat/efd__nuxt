<script setup lang="ts">
import FullCoverLoading from "~/components/shared/FullCoverLoading.vue";
import {
  clickPostCode,
  onMountAddress,
  unMountAddress,
} from "~/utils/postCode/address";
const btnPending = ref(false);
const imgData = ref<null | File>(null);
const itemData = ref({
  itemName: "",
  itemPrice: "",
  ItemDesc: "",
});
const addressObj = ref({
  sido: "",
  sigungu: "",
  bname: "",
  bname1: "",
  roadAddress: "",
  buildingName: "",
  zonecode: "",
  restAddress: "",
});
const url = ref("");
const handleImgUrlFile = async (data: FileList) => {
  const file = data[0];
  if (file) {
    url.value = URL.createObjectURL(file);
    imgData.value = file;
  }
};
const submitForm = async () => {
  btnPending.value = true;
  const formData = new FormData();
  if (imgData.value) formData.append("data", imgData.value);
  formData.append("itemData", JSON.stringify(itemData.value));
  formData.append("address", JSON.stringify(addressObj.value));
  const {data, error} = await useFetch("/api/market/itemResister", {
    body: formData,
    method: "POST",
  });

  if (data.value?.ok) {
    alert("상품이 등록되었습니다.");
    btnPending.value = false;
    return navigateTo("/market");
  } else {
    const err = error.value?.data as Error;
    alert(err.message);
    btnPending.value = false;
  }
};
const inputFileClick = () => {
  const input = document.getElementById("itemImgFile");
  if (input) {
    input?.click();
  }
};

onMounted(async () => {
  onMountAddress();
});
onUnmounted(() => {
  unMountAddress();
});
useHead({
  title: "물건등록하기",
});
</script>
<template>
  <div class="w-full h-full p-5">
    <form
      @submit.prevent="submitForm"
      method="post"
      class="flex flex-col h-full gap-5"
    >
      <!-- image -->
      <div
        @click="inputFileClick"
        class="border border-dashed rounded-lg p-5 cursor-pointer flex items-center justify-center w-full h-96"
      >
        <NuxtImg v-if="url !== ''" :src="url" class="size-80 cursor-pointer" />

        <Icon
          v-if="url === ''"
          name="mdi:file-image"
          class="size-32 cursor-pointer"
        />

        <input
          id="itemImgFile"
          type="file"
          hidden
          @change="handleImgUrlFile(($event.target as HTMLInputElement).files!)"
        />
      </div>
      <!-- item data -->
      <div class="flex flex-col gap-3">
        <label for="itemName">물건이름</label>
        <input
          id="itemName"
          type="text"
          placeholder="물건이름"
          @change="(event) => itemData.itemName = (event.target as HTMLInputElement).value"
          class="px-3 py-2 rounded-lg bg-slate-600 placeholder:text-warnYellow"
        />
      </div>
      <div class="flex flex-col gap-3">
        <label for="itemPrice">물건가격</label>
        <input
          id="itemPrice"
          type="text"
          placeholder="가격"
          @change="(event) => itemData.itemPrice = (event.target as HTMLInputElement).value"
          class="px-3 py-2 rounded-lg bg-slate-600 placeholder:text-warnYellow"
        />
      </div>
      <div class="flex flex-col gap-3">
        <label for="설명">설명</label>
        <input
          id="itemDesc"
          type="text"
          placeholder="설명"
          @change="(event) => itemData.ItemDesc = (event.target as HTMLInputElement).value"
          class="px-3 py-2 rounded-lg bg-slate-600 placeholder:text-warnYellow"
        />
      </div>
      <!-- address data -->
      <div class="flex flex-col gap-3">
        <label for="address">주소</label>
        <div class="flex items-center gap-3">
          <div
            @click.prevent="clickPostCode(addressObj)"
            class="cursor-pointer"
          >
            <input
              id="address"
              type="text"
              placeholder="우편번호"
              :value="addressObj.zonecode"
              style="pointer-events: none"
              disabled
              class="px-3 py-2 rounded-lg bg-slate-600 placeholder:text-warnYellow"
            />
          </div>
          <button
            @click.prevent="clickPostCode(addressObj)"
            class="bg-warnYellow text-slate-800 px-3 py-2 rounded-md"
          >
            우편번호찾기
          </button>
        </div>

        <input
          type="text"
          placeholder="주소"
          :value="
            addressObj.roadAddress &&
            `${addressObj.roadAddress}${
              addressObj.buildingName && `(${addressObj.buildingName})`
            }`
          "
          disabled
          class="px-3 py-2 rounded-lg bg-slate-600 placeholder:text-warnYellow"
        />
        <input
          type="text"
          placeholder="상세주소"
          :value="addressObj.restAddress"
          @change="(event)=>addressObj.restAddress=(event.target as HTMLInputElement).value"
          class="px-3 py-2 rounded-lg bg-slate-600 placeholder:text-warnYellow"
        />
      </div>

      <div class="flex gap-5 *:px-3 *:py-2 *:rounded-md">
        <button
          :class="
            btnPending
              ? 'bg-slate-500 text-slate-200'
              : 'bg-warnYellow text-slate-800'
          "
          :disabled="btnPending"
        >
          {{ !btnPending ? "등록" : "등록중" }}
        </button>
        <NuxtLink to="/market" class="bg-warnYellow text-slate-800"
          >취소</NuxtLink
        >
      </div>
    </form>
  </div>
  <FullCoverLoading :loading="btnPending" />
</template>
