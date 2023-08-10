<script setup lang="ts">
import { CreatePostDocument, CreatePostMutationVariables } from '@/api/graphql'

const router = useRouter()
const dialog = useDialog()
const { mutate, loading } = useMutation(CreatePostDocument)

async function submit(props: CreatePostMutationVariables) {
  const data = await mutate(props)

  if (data?.data?.post.id) {
    await dialog.open({
      title: '포스팅 작성 완료',
      confirmText: '확인',
    })

    router.replace(`/post/${data.data.post.id}`)
  } else {
    await dialog.open({
      title: '포스팅 작성 실패',
      confirmText: '확인',
    })
  }
}
</script>

<template>
  <LayoutInner>
    <template #header>
      <div class="pb-4 text-2xl font-bold">포스팅 작성</div>
    </template>
    <PostEdit :loading="loading" @submit="submit" />
  </LayoutInner>
</template>
