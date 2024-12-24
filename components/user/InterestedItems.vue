<script setup lang="ts">
import SharedText from "../shared/SharedText.vue";
import UserInfoLayout from "./UserInfoLayout.vue";
import type {UserInfoType} from "~/server/api/auth/getUserInfo.get";
const {data} = useNuxtData<UserInfoType>("userInfo");
</script>

<template>
  <UserInfoLayout>
    <SharedText tag="h2" txt="관심품목" />
  </UserInfoLayout>
</template>
