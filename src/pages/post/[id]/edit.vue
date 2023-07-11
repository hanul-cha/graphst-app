<script setup lang="ts">
const id = useRouteParams<string>('id')
async function submit() {}
</script>

<template>
  <div class="h-full w-full">
    <PostEdit :id="id" @submit="submit" />
  </div>
</template>
