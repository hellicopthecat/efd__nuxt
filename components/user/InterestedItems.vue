<script setup lang="ts">
import type {IItemTypes} from "~/types/userProfile/userProfileItemsType";
import SharedText from "../shared/SharedText.vue";
import MyItems from "./MyItems.vue";
import UserInfoLayout from "./UserInfoLayout.vue";
import type {UserInfoType} from "~/server/api/auth/getUserInfo.get";
const {data} = useNuxtData<UserInfoType>("userInfo");
</script>

<template>
  <UserInfoLayout>
    <SharedText tag="h2" txt="관심품목" />
    <ul class="grid grid-cols-6 gap-5">
      <MyItems
        v-for="items in data?.interestedItem"
        :items="items as IItemTypes"
      />
    </ul>
  </UserInfoLayout>
</template>
