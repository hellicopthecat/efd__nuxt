<script setup lang="ts">
import type {UserInfoType} from "~/server/api/auth/getUserInfo.get";
import SharedText from "../shared/SharedText.vue";
import UserInfoLayout from "./UserInfoLayout.vue";
import type {IItemTypes} from "~/types/userProfile/userProfileItemsType";
import MyItems from "./MyItems.vue";
const {data} = useNuxtData<UserInfoType>("userInfo");
</script>

<template>
  <UserInfoLayout>
    <SharedText tag="h2" txt="판매품" />
    <ul class="grid grid-cols-6 gap-5">
      <MyItems v-for="items in data?.sellItem" :items="items as IItemTypes" />
    </ul>
  </UserInfoLayout>
</template>
