<script setup lang="ts">
import { GetPostDocument } from '@/api/graphql'
import { useAuthStore } from '@/store/auth'

const id = useRouteParams<string>('id')
const auth = useAuthStore()
const router = useRouter()
const dialog = useDialog()

const { result, loading } = useQuery(GetPostDocument, () => ({
  id: id.value,
}))

const post = computed(() => result.value?.getPost)
</script>

<template>
  <template v-if="loading">
    <LayoutInner>
      <div class="pb-4 text-2xl font-bold">로딩중...</div>
    </LayoutInner>
  </template>
  <template v-else-if="!post">
    <LayoutInner>
      <div class="pb-4 text-2xl font-bold">포스팅이 없습니다.</div>
    </LayoutInner>
  </template>
  <template v-else>
    <LayoutInner>
      <template #header>
        <div class="pb-4 text-2xl font-bold">{{ post.title }}</div>
      </template>
      <InputEditor :model-value="post.contents" readonly />
      <div>여긴 댓글창</div>
    </LayoutInner>
  </template>
</template>
