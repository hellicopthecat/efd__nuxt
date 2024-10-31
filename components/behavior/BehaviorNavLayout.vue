<template>
  <nav class="flex gap-5">
    <NuxtLink to="/behavior">
      <Icon name="heroicons-solid:arrow-sm-left" class="size-8" />
    </NuxtLink>
    <ul
      class="flex gap-5 flex-wrap *:cursor-pointer hover:*:bg-slate-500 *:px-2 *:py-1 *:rounded-md *:text-nowrap"
    >
      <slot />
    </ul>
  </nav>
</template>
