<script setup lang="ts">
import type {UserInfoType} from "~/server/api/auth/getUserInfo.get";
import SharedText from "../shared/SharedText.vue";
import UserInfoLayout from "./UserInfoLayout.vue";
import type {IItemTypes} from "~/types/userProfile/userProfileItemsType";
import MyItems from "./MyItems.vue";
import UserPageItemListLayout from "./UserPageItemListLayout.vue";
const {data} = useNuxtData<UserInfoType>("userInfo");
</script>

<template>
  <UserInfoLayout>
    <SharedText tag="h2" txt="판매품" />
    <UserPageItemListLayout>
      <MyItems v-for="items in data?.sellItem" :items="items as IItemTypes" />
    </UserPageItemListLayout>
  </UserInfoLayout>
</template>
