<script setup lang="ts">
import {} from '@/api/graphql'
import { useFilterStore } from '@/store/filter'

// TODO: 다른곳에서 사용할 때 안불리는 문제 수정
const useFilter = useFilterStore()

const filter = useFilter.on({
  my: {
    type: Boolean,
  },
  myLike: {
    type: Boolean,
  },
  query: {
    type: String,
  },
})
</script>

<template>
  <div class="h-full w-full p-4">
    <template v-if="useFilter.filter">
      <FilterHistory v-model:model-value="useFilter.filter" />
    </template>
  </div>
</template>
