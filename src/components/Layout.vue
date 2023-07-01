<script setup lang="ts">
import { useAuthStore } from '@/store/auth'

const auth = useAuthStore()
onMounted(async () => {
  await auth.getUser()
})
</script>

<template>
  <div class="absolute inset-0 flex min-h-full flex-col">
    {{ auth.user }}
    <div class="flex-none">asdfasdfasdf</div>
    <div class="relative h-full w-full flex-1 overflow-auto">
      <slot />
    </div>
  </div>
</template>
