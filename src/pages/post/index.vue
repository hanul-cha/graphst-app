<script setup lang="ts">
import {} from '@/api/graphql'
import { useFilter } from '@/utils/filter'

// const router = useRouter()
// const dialog = useDialog()

// const my = useRouteQuery<string | null>('my')
// const like = useRouteQuery<string | null>('like')
// const category = useRouteQuery<string | null>('category')

const tt = ref<string[]>([])

const { test1, test2, test3, test4 } = useFilter({
  test1: {
    type: Boolean,
  },
  test2: {
    type: Number,
    isMultiple: true,
  },
  test3: {
    type: String,
    isMultiple: true,
  },
  test4: {
    type: Number,
  },
})
</script>

<template>
  <div class="h-full w-full">
    {{ test1 }}
    {{ test2 }}
    {{ test3 }}
    {{ test4 }}
    {{ tt }}
    <div @click="test1 = !test1">1</div>
    <div @click="test2 = []">2</div>
    <div @click="test3.push('33')">3</div>
    <div @click="test4 = 2">4</div>
    <div @click="tt.push('22')">tt</div>
  </div>
</template>
