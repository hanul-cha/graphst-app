<script setup lang="ts">
import { UpdatePostDocument, CreatePostMutationVariables } from '@/api/graphql'

const id = useRouteParams<string>('id')
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
</script>

<template>
  <div class="h-full w-full">
    <PostEdit :id="id" :loading="loading" @submit="submit" />
  </div>
</template>
