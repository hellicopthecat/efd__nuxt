<script setup lang="ts">
import InterestedItems from "~/components/user/InterestedItems.vue";
import ProfileNav from "~/components/user/ProfileNav.vue";
import SellingItems from "~/components/user/SellingItems.vue";
import UserProfile from "~/components/user/UserProfile.vue";
const route = useRoute();
const router = useRouter();
const currentIndex = ref<number | null>(null);

const editCurrentIndex = (index: number) => {
  sessionStorage.setItem("USERNAV", index + "");
  currentIndex.value = Number(sessionStorage.getItem("USERNAV"));
};
onMounted(async () => {
  currentIndex.value = Number(sessionStorage.getItem("USERNAV"));

  const uid = await $fetch("/api/auth/getUid");
  if (route.params.id !== uid) {
    router.replace(`/profile/${uid}`);
  }
});

const titleFn = (index: number) => {
  if (index === 0) {
    return "회원정보";
  } else if (index === 1) {
    return "판매품";
  } else {
    return "관심품목";
  }
};
useHead({title: () => titleFn(Number(currentIndex.value))});
</script>
<template>
  <div class="flex flex-col xl:flex-row w-full">
    <ProfileNav
      :index="Number(currentIndex)"
      @editCurrentIndex="(index) => editCurrentIndex(index)"
    />
    <div class="p-16">
      <UserProfile v-if="currentIndex === 0" />
      <SellingItems v-if="currentIndex === 1" />
      <InterestedItems v-if="currentIndex === 2" />
    </div>
  </div>
</template>
