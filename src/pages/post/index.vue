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
  <LayoutInner><div class="h-[2000px]">asdfsdf</div></LayoutInner>
</template>
