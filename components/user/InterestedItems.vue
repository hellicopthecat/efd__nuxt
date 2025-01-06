<script setup lang="ts">
import type {IItemTypes} from "~/types/userProfile/userProfileItemsType";
import SharedText from "../shared/SharedText.vue";
import MyItems from "./MyItems.vue";
import UserInfoLayout from "./UserInfoLayout.vue";
import type {UserInfoType} from "~/server/api/auth/getUserInfo.get";
import UserPageItemListLayout from "./UserPageItemListLayout.vue";
const {data} = useNuxtData<UserInfoType>("userInfo");
</script>

<template>
  <UserInfoLayout>
    <SharedText tag="h2" txt="관심품목" />
    <UserPageItemListLayout>
      <MyItems
        v-for="items in data?.interestedItem"
        :items="items as IItemTypes"
      />
    </UserPageItemListLayout>
  </UserInfoLayout>
</template>
