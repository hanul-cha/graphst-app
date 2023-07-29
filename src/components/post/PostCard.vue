<script setup lang="ts">
import { PostInPageFragment, ToggleLikePostDocument } from '@/api/graphql'
import { useAuthStore } from '@/store/auth'

export interface PostCardProps {
  post: PostInPageFragment
}

interface PostCardEmits {
  (_e: 'update', _value: PostInPageFragment): void
}

const props = defineProps<PostCardProps>()
const emit = defineEmits<PostCardEmits>()

const auth = useAuthStore()
const dialog = useDialog()
const router = useRouter()

const { mutate, loading } = useMutation(ToggleLikePostDocument)

async function toggleLike(like: boolean) {
  if (loading.value) return
  if (!auth.user) {
    const confirm = await dialog.open({
      title: '로그인이 필요합니다',
      message: '로그인하러 가시겠습니까?',
      confirmText: '로그인',
    })
    if (confirm) {
      router.push('/signin')
    }
    return
  }
  const data = await mutate({
    targetId: props.post.id,
    like,
  })
  if (!data?.data?.result) {
    await dialog.open({
      title: '알수없는 에러',
      message: '같은 현상이 발생하면 1대1 문의를 이용해주세요.',
      confirmText: '확인',
    })
    return
  }
  emit('update', {
    ...props.post,
    isLike: like,
    countLike: props.post.countLike + (like ? 1 : -1),
  })
}
</script>

<template>
  <Card @click="$router.push(`/post/${post.id}`)">
    <div class="absolute right-0 top-0 flex pr-1">
      <div
        class="flex cursor-pointer items-center p-2"
        @click="toggleLike(!post.isLike)"
      >
        <template v-if="post.isLike">
          <IconFillHeart class="h-5 w-5 fill-red-500" />
        </template>
        <template v-else>
          <IconLineHeart class="h-5 w-5 fill-gray-500" />
        </template>
        <div class="text-gray-500">{{ post.countLike }}</div>
      </div>
      <div class="flex items-center gap-x-1 p-2">
        <IconComment class="h-4 w-4" />
        <div class="text-gray-500">{{ post.countComment }}</div>
      </div>
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
    <UserTooltip :id="post.user.id" :name="post.user.name" />
  </Card>
</template>
