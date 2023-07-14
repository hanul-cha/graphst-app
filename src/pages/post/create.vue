<script setup lang="ts">
import { CreatePostDocument, CreatePostMutationVariables } from '@/api/graphql'

const router = useRouter()
const dialog = useDialog()
const { mutate, loading } = useMutation(CreatePostDocument)

async function submit(props: CreatePostMutationVariables) {
  console.log(props)
  await mutate(props)

  await dialog.open({
    title: '포스팅 작성 완료',
    confirmText: '확인',
  })

  router.push('/')
}
</script>

<template>
  <div class="h-full w-full">
    <PostEdit :loading="loading" @submit="submit" />
  </div>
</template>
