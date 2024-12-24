<script setup lang="ts">
import InterestedItems from "~/components/user/InterestedItems.vue";
import ProfileNav from "~/components/user/ProfileNav.vue";
import SellingItems from "~/components/user/SellingItems.vue";
import UserProfile from "~/components/user/UserProfile.vue";

const currentIndex = ref<number | null>(null);

const editCurrentIndex = (index: number) => {
  sessionStorage.setItem("USERNAV", index + "");
  currentIndex.value = Number(sessionStorage.getItem("USERNAV"));
};
onMounted(() => {
  currentIndex.value = Number(sessionStorage.getItem("USERNAV"));
});
</script>
<template>
  <div class="flex w-full h-full">
    <ProfileNav
      :index="Number(currentIndex)"
      @editCurrentIndex="(index) => editCurrentIndex(index)"
    />
    <div class="p-16 w-full">
      <UserProfile v-if="currentIndex === 0" />
      <SellingItems v-if="currentIndex === 1" />
      <InterestedItems v-if="currentIndex === 2" />
    </div>
  </div>
</template>
