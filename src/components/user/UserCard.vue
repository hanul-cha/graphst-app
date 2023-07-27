<script setup lang="ts">
import { ToggleLikeUserDocument, UserFullFragment } from '@/api/graphql'
import { useAuthStore } from '@/store/auth'

export interface UserCardProps {
  user: UserFullFragment
}

interface UserCardEmits {
  (_e: 'update:user', _value: UserFullFragment): void
}

const props = defineProps<UserCardProps>()
const emit = defineEmits<UserCardEmits>()

const auth = useAuthStore()
const router = useRouter()
const dialog = useDialog()

const { mutate: toggleLikeUser, loading: toggleLikeLoading } = useMutation(
  ToggleLikeUserDocument
)

async function toggleLike() {
  if (toggleLikeLoading.value) return
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

  if (props.user.id === auth.user?.id) {
    await dialog.open({
      title: '로그인이 필요합니다',
      confirmText: '확인',
    })
    return
  }

  const data = await toggleLikeUser({
    targetId: props.user.id,
    like: !props.user.isLike,
  })

  if (data?.data?.result) {
    emit('update:user', {
      ...props.user,
      isLike: !props.user.isLike,
      countFollower: props.user.countFollower + (props.user.isLike ? -1 : 1),
    })
  }
}
</script>

<template>
  <div class="flex items-center gap-x-2">
    <div class="h-10 w-10 rounded-full bg-white" />
    <div class="flex flex-col justify-center px-2">
      <div>{{ user.name }}</div>
      <div class="flex gap-x-3">
        <div
          class="flex cursor-pointer items-center gap-x-1"
          @click="toggleLike"
        >
          <template v-if="user.isLike">
            <IconFillHeart class="h-5 w-5" />
          </template>
          <template v-else>
            <IconLineHeart class="h-5 w-5" />
          </template>
          {{ user.countFollower }}
        </div>
        <div class="flex items-center gap-x-1">
          <IconPost class="h-4 w-4" /> {{ user.countPost }}
        </div>
      </div>
    </div>
  </div>
</template>
