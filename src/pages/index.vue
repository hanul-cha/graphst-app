<script setup lang="ts">
const router = useRouter()

onBeforeMount(() => {
  router.push({
    path: '/post',
    force: true,
    query: {},
  })
})
</script>

<template>
  <div></div>
</template>
