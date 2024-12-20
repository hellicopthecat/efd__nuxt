<script setup lang="ts">
import SharedText from "~/components/shared/SharedText.vue";
import {
  clickPostCode,
  onMountAddress,
  unMountAddress,
} from "~/utils/postCode/address";

useHead({title: "회원가입"});
definePageMeta({
  layout: "auth-layout",
});
const router = useRouter();
const formData = ref({
  uid: "",
  name: "",
  email: "",
  password: "",
  checkPass: "",
  addressData: {
    sido: "",
    sigungu: "",
    bname: "",
    bname1: "",
    roadAddress: "",
    buildingName: "",
    zonecode: "",
  },
  restAddress: "",
});

const errorMsg = ref("");
const submitJoin = async () => {
  const {data, error} = await useAsyncData("join", () =>
    $fetch("/api/auth/join", {method: "POST", body: formData.value})
  );
  if (data.value && data.value.success) {
    router.push("/");
  }
  if (error.value && error.value.data) {
    const err = error.value.data as Error;
    errorMsg.value = err.message;
  }
};
const handleErrOffClick = () => {
  errorMsg.value = "";
  clearError();
};
onMounted(() => {
  onMountAddress();
});
onUnmounted(() => {
  unMountAddress();
});
</script>
<template>
  <div
    class="relative flex flex-col justify-between bg-white/10 rounded-lg border border-white/25 h-full w-[40%] p-10"
  >
    <div
      v-if="errorMsg"
      class="flex justify-between items-center bg-red-700 px-5 py-2 rounded-lg"
    >
      <SharedText tag="h6" :txt="errorMsg" />
      <button
        @click="handleErrOffClick"
        class="rounded-lg hover:bg-pink-800 px-3 py-2"
      >
        확인
      </button>
    </div>
    <form
      @submit.prevent="submitJoin"
      method="post"
      class="flex flex-col justify-center gap-5 h-full"
    >
      <legend class="mx-auto"><SharedText tag="h2" txt="회원가입" /></legend>
      <SharedInput
        label-txt="아이디"
        name="uid"
        type="text"
        placeholder="아이디"
        :value="formData.uid"
        @update:value="formData.uid = $event"
      />
      <SharedInput
        label-txt="이름"
        name="name"
        type="text"
        placeholder="이름"
        :value="formData.name"
        @update:value="formData.name = $event"
      />
      <SharedInput
        label-txt="이메일"
        name="email"
        type="text"
        placeholder="이메일"
        :value="formData.email"
        @update:value="formData.email = $event"
      />
      <div class="flex flex-col gap-3">
        <label for="zonecode">주소</label>
        <div class="flex items-center gap-5">
          <input
            id="zonecode"
            type="text"
            placeholder="우편번호"
            class="bg-darkBlue h-10 px-5 rounded-xl"
            :value="formData.addressData.zonecode"
            disabled
          />
          <button
            class="mt-auto bg-slate-600 px-4 py-2 rounded-lg hover:bg-slate-800"
            @click.prevent="clickPostCode(formData.addressData)"
          >
            주소찾기
          </button>
        </div>
        <div class="flex gap-3">
          <input
            type="text"
            placeholder="도로명 주소"
            class="bg-darkBlue w-full h-10 px-5 rounded-xl"
            :value="`${formData.addressData.roadAddress}${
              formData.addressData.buildingName &&
              `(${formData.addressData.buildingName})`
            }`"
            disabled
          />
          <input
            type="text"
            placeholder="나머지 주소"
            class="bg-darkBlue w-full h-10 px-5 rounded-xl"
            :value="formData.restAddress"
            @input="(event) => {formData.restAddress = (event.target as HTMLInputElement).value}"
          />
        </div>
      </div>
      <SharedInput
        label-txt="비밀번호"
        name="password"
        type="text"
        placeholder="비밀번호"
        :value="formData.password"
        @update:value="formData.password = $event"
      />
      <SharedInput
        label-txt="비밀번호 확인"
        name="checkPass"
        type="text"
        placeholder="비밀번호 확인"
        :value="formData.checkPass"
        @update:value="formData.checkPass = $event"
      />

      <button type="submit" class="bg-warnYellow h-10 rounded-lg text-black">
        회원가입
      </button>
    </form>
    <div class="flex justify-center">
      <p class="flex gap-5">
        이미 회원이신가요?
        <NuxtLink href="/login" class="text-warnYellow"> 로그인 </NuxtLink>
      </p>
    </div>
  </div>
</template>
