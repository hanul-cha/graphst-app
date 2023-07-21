<template>
  <div class="flex h-full w-full flex-col p-4">
    <slot name="header" />
    <div class="h-full w-full flex-1 overflow-auto rounded-xl bg-white p-4">
      <slot />
    </div>
    <slot name="bottom" />
  </div>
</template>
