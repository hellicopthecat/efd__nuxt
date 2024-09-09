<script setup lang="ts">
interface IInputProps {
  labelTxt: string;
  name: string;
  type: HTMLInputElement["type"];
  placeholder: string;
  required?: boolean;
  value?: string;
}
defineProps<IInputProps>();

const emit = defineEmits(["update:value"]);
const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit("update:value", input.value);
};
</script>
<template>
  <div class="flex flex-col gap-2">
    <label :for="name">{{ labelTxt }}</label>
    <input
      :id="name"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      class="bg-darkBlue h-10 px-5 rounded-xl"
      :value="value"
      @input="handleInput"
    />
  </div>
</template>
