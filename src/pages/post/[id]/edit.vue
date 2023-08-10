<script setup lang="ts">
import {
  UpdatePostDocument,
  CreatePostMutationVariables,
  GetPostDocument,
} from '@/api/graphql'
import { useAuthStore } from '@/store/auth'

const id = useRouteParams<string>('id')
const auth = useAuthStore()
const router = useRouter()
const dialog = useDialog()

const { result, onResult } = useQuery(GetPostDocument, () => ({
  id: id.value,
}))
onResult(async (result) => {
  const post = result.data.getPost
  if (!auth.user || !post || auth.user.id !== post.user.id) {
    await dialog.open({
      title: '권한이 없습니다.',
      confirmText: '확인',
    })
    router.replace('/post')
  }
})
const { mutate, loading } = useMutation(UpdatePostDocument)

const post = computed(() => result.value?.getPost)

async function submit(props: CreatePostMutationVariables) {
  await mutate({
    postId: id.value,
    ...props,
  })

  await dialog.open({
    title: '포스팅 수정 완료',
    confirmText: '확인',
  })

  router.replace(`/post/${id.value}`)
}
</script>

<template>
  <LayoutInner>
    <template #header>
      <div class="pb-4 text-2xl font-bold">포스팅 수정</div>
    </template>
    <template v-if="!auth.user || auth.user.id !== post?.user.id">
      <PostEdit />
    </template>
    <template v-else>
      <PostEdit :post="post" :loading="loading" @submit="submit" />
    </template>
  </LayoutInner>
</template>
