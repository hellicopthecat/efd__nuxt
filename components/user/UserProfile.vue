<script setup lang="ts">
import SharedText from "~/components/shared/SharedText.vue";
import type {UserInfoType} from "~/server/api/auth/getUserInfo.get";
import UserInfoLayout from "./UserInfoLayout.vue";
import DeleteAccount from "./DeleteAccount.vue";
const avatarUrl = ref<string | null>(null);
const {data} = useNuxtData<UserInfoType>("userInfo");
//fn
const selectAvatarImg = async (dataFile: FileList) => {
  avatarUrl.value = "";
  const file = dataFile[0];
  const url = URL.createObjectURL(file);
  const ok = confirm("수정하시겠습니까?");
  if (ok) {
    avatarUrl.value = url;
    const formData = new FormData();
    formData.append("data", file);
    const result = await $fetch("/api/auth/uploadAvatar", {
      method: "POST",
      body: formData,
    });
    if (data.value) {
      avatarUrl.value = "";
      data.value.avatarUrl = result?.url + "";
    }
    alert("수정되었습니다.");
  } else {
    return;
  }
};
const openFilePicker = () => {
  const avatarFile = document.getElementById("avatarFile");
  avatarFile?.click();
};
</script>

<template>
  <UserInfoLayout>
    <div class="flex items-center gap-10">
      <div class="relative">
        <div class="bg-indigo-500 rounded-full overflow-hidden">
          <label
            for="avatarFile"
            class="cursor-pointer overflow-hidden *:size-32"
          >
            <Icon v-if="!data?.avatarUrl && !avatarUrl" name="mdi:user" />
            <NuxtImg
              v-if="avatarUrl ?? data?.avatarUrl"
              :src="avatarUrl! ?? data?.avatarUrl"
            />
          </label>

          <form>
            <input
              id="avatarFile"
              type="file"
              hidden
              @change="(event) => selectAvatarImg((event.target as HTMLInputElement).files!)"
            />
          </form>
        </div>
        <button
          @click="openFilePicker"
          class="absolute -right-3 bottom-2 bg-orange-600 p-1 rounded-full overflow-hidden flex items-center justify-center ring-2 ring-slate-400"
        >
          <Icon name="mdi:pencil" class="size-10" />
        </button>
      </div>
      <div class="flex flex-col gap-3">
        <SharedText tag="h2" :txt="`Hello, ${data?.uid}`" />
        <SharedText
          v-if="data?.name"
          id="name"
          tag="span"
          :txt="data?.name"
          className="text-xl text-warnYellow/70"
        />
      </div>
    </div>
    <div class="grid grid-cols-2 gap-10">
      <div class="flex flex-col gap-3">
        <SharedText tag="label" id="name" txt="이름" :className="'text-2xl'" />
        <SharedText v-if="data?.name" id="name" tag="h2" :txt="data?.name" />
      </div>
      <div class="flex flex-col gap-3">
        <SharedText
          tag="label"
          id="email"
          txt="이메일"
          :className="'text-2xl'"
        />
        <SharedText tag="h2" id="email" :txt="data?.email" />
      </div>
      <!-- 주소 시작 -->
      <div class="flex flex-col gap-10">
        <div class="flex items-center gap-5">
          <div class="w-5 h-full bg-cyan-600" />
          <SharedText tag="h2" txt="주소" :className="'text-2xl'" />
        </div>
        <div class="grid grid-cols-2 gap-10">
          <!-- 우편번호 -->
          <div class="flex flex-col gap-2">
            <SharedText
              tag="label"
              id="postalCode"
              txt="우편번호"
              :className="'text-2xl'"
            />
            <SharedText
              id="postalCode"
              tag="h3"
              :txt="data?.address.zonecode"
            />
          </div>
          <!-- 위치 -->
          <div class="flex flex-col gap-3">
            <SharedText
              tag="label"
              id="location"
              txt="주소"
              :className="'text-2xl'"
            />
            <div class="flex gap-5">
              <SharedText id="location" tag="h3" :txt="data?.address.sido" />
              <SharedText tag="h3" :txt="data?.address.sigungu" />
              <SharedText tag="h3" :txt="data?.address.bname" />
              <SharedText
                v-if="data?.address.bname1"
                tag="h3"
                :txt="data?.address.bname1"
              />
            </div>
          </div>
          <!-- 도로명주소 -->
          <div class="col-span-2 flex flex-col gap-3">
            <SharedText
              tag="label"
              id="roadAdress"
              txt="도로명 주소"
              :className="'text-2xl'"
            />
            <div class="flex">
              <SharedText
                id="roadAdress"
                tag="h3"
                :txt="data?.address.roadAddress"
              />
              <SharedText tag="h3" :txt="data?.address.buildingNmae" />
              <SharedText
                v-if="data?.address.restAddress"
                tag="h3"
                :txt="data?.address.restAddress"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <DeleteAccount />
  </UserInfoLayout>
</template>
