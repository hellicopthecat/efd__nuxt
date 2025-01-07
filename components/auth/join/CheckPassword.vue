<script setup lang="ts">
interface IPasswordCheckTypes {
  password: string;
  checkPass: string;
}
const {password, checkPass} = defineProps<IPasswordCheckTypes>();
</script>
<template>
  <div class="flex items-center gap-5">
    <Icon
      v-if="password && password === checkPass"
      name="mdi:check-circle"
      class="size-5 text-green-500"
    />
    <SharedText
      v-if="password && password === checkPass"
      tag="span"
      txt="일치합니다."
      class-name="text-green-500"
    />
    <Icon
      v-if="password && password !== checkPass"
      name="mdi:minus-circle"
      class="size-5 text-red-500"
    />
    <SharedText
      v-if="password && password !== checkPass"
      tag="span"
      txt="불일치합니다."
      class-name="text-red-500"
    />
  </div>
</template>
