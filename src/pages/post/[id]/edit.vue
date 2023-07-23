<script setup lang="ts">
import { UpdatePostDocument, CreatePostMutationVariables } from '@/api/graphql'
import { useAuthStore } from '@/store/auth'

const id = useRouteParams<string>('id')
const auth = useAuthStore()
const router = useRouter()
const dialog = useDialog()
const { mutate, loading } = useMutation(UpdatePostDocument)

async function submit(props: CreatePostMutationVariables) {
  await mutate({
    postId: id.value,
    ...props,
  })

  await dialog.open({
    title: '포스팅 수정 완료',
    confirmText: '확인',
  })

  router.push('/post?my=true')
}

onMounted(async () => {
  if (!auth.user || auth.user.id !== id.value) {
    await dialog.open({
      title: '권한이 없습니다.',
      confirmText: '확인',
    })
    router.replace('/post')
  }
})
</script>

<template>
  <LayoutInner>
    <template #header>
      <div class="pb-4 text-2xl font-bold">포스팅 작성</div>
    </template>
    <template v-if="!auth.user || auth.user.id !== id">
      <Post />
    </template>
    <template v-else>
      <PostEdit :id="id" :loading="loading" @submit="submit" />
    </template>
  </LayoutInner>
</template>
