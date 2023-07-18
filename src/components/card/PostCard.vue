<script setup lang="ts">
import { PostInPageFragment } from '@/api/graphql'

export interface PostCardProps {
  post: PostInPageFragment
}

const props = defineProps<PostCardProps>()

const isLike = ref(false)
</script>

<template>
  <Card>
    <div class="absolute right-0 top-0 flex items-center p-2">
      <template v-if="isLike">
        <IconHeartFill class="h-5 w-5 fill-red-500" />
      </template>
      <template v-else>
        <IconLineHeart class="h-5 w-5 fill-gray-500" />
      </template>
      <div class="text-gray-500">X {{ post.countLike }}</div>
    </div>
    <div>
      <div class="text-lg font-semibold">
        {{ post.title }}
      </div>
      <div
        class="text-sm"
        :class="{
          'text-gray-500': !post.category?.label,
          'text-current': post.category?.label,
        }"
      >
        {{ post.category?.label ?? '카테고리 없음' }}
      </div>
    </div>
    <div>
      {{ post.user.name }}
    </div>
  </Card>
</template>
