<script setup lang="ts">
import {} from '@/api/graphql'
import { useFilterStore } from '@/store/filter'

const useFilter = useFilterStore()

const filter = useFilter.on({
  my: {
    type: Boolean,
    label: '내 포스팅',
  },
  myLike: {
    type: Boolean,
    label: '좋아요한 포스팅',
  },
  query: {
    type: String,
    label: '검색어',
  },
})
</script>

<template>
  <div class="h-full w-full p-4">본문</div>
</template>
