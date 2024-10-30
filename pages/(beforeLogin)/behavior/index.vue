<script setup lang="ts"></script>
<template>
  <div class="flex justify-center items-center w-full h-full p-10">
    <ul
      class="grid grid-cols-2 gap-5 text-center *:bg-slate-700 *:h-20 *:w-96 *:rounded-md hover:*:bg-slate-500"
    >
      <li>
        <NuxtLink to="/behavior/natural">
          <SharedText tag="h5" txt="자연재난" class-name="leading-[80px]" />
        </NuxtLink>
      </li>
      <li>
        <SharedText tag="h5" txt="사회재난" class-name="leading-[80px]" />
      </li>
      <li>
        <SharedText tag="h5" txt="생활안전" class-name="leading-[80px]" />
      </li>
      <li><SharedText tag="h5" txt="민방위" class-name="leading-[80px]" /></li>
    </ul>
  </div>
</template>
