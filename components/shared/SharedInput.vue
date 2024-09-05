<script setup lang="ts">
interface IInputProps {
  labelTxt: string;
  name: string;
  type: HTMLInputElement["type"];
  placeholder: string;
}

defineProps<IInputProps>();
</script>
<template>
  <div class="flex flex-col gap-2">
    <label :for="name">{{ labelTxt }}</label>
    <input
      :id="name"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      class="bg-darkBlue h-10 px-5 rounded-xl"
    />
  </div>
</template>
