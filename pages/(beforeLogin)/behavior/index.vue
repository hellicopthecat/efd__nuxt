<script setup lang="ts"></script>
<template>
  <div class="flex justify-center items-center w-full h-full p-10">
    <ul
      class="grid grid-cols-2 gap-5 text-center *:bg-slate-700 *:h-20 *:w-96 *:rounded-md hover:*:bg-slate-500"
    >
      <li>
        <NuxtLink to="/behavior/natural-behavior">
          <SharedText tag="h5" txt="자연재난" class-name="leading-[80px]" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/behavior/social-behavior">
          <SharedText tag="h5" txt="사회재난" class-name="leading-[80px]" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/behavior/life-safety">
          <SharedText tag="h5" txt="생활안전" class-name="leading-[80px]" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/behavior/civil-defence">
          <SharedText tag="h5" txt="민방위" class-name="leading-[80px]" />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
