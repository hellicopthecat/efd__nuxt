<script setup lang="ts">
import type {UserInfoType} from "~/server/api/auth/getUserInfo.get";
import SharedText from "../shared/SharedText.vue";
import UserInfoLayout from "./UserInfoLayout.vue";
const {data} = useNuxtData<UserInfoType>("userInfo");
</script>

<template>
  <UserInfoLayout>
    <SharedText tag="h2" txt="판매품" />
    <div class="grid grid-cols-6">
      <div v-for="items in data?.sellItem">
        <NuxtLink :href="`/market/${items.id}`">
          <SharedText tag="h4" :txt="items.itemName" />
        </NuxtLink>
      </div>
    </div>
  </UserInfoLayout>
</template>
