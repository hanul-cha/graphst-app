<script setup lang="ts">
import { UserFullFragment } from '@/api/graphql'
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

async function toggleLike() {
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
      title: '자기 자신은 팔로우할 수 없습니다.',
      confirmText: '확인',
    })
    return
  }

  let success = false

  if (props.user.isLike) {
    success = !!(await auth.unFollow(props.user.id))
  } else {
    success = !!(await auth.follow(props.user.id))
  }

  if (success) {
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
    <div
      class="flex h-10 w-10 items-center justify-center rounded-full bg-white"
    >
      <IconUser class="h-6 w-6 stroke-gray-300" />
    </div>
    <div class="flex flex-col justify-center px-2">
      <div>{{ user.name }}</div>
      <div class="flex gap-x-3">
        <div
          class="flex cursor-pointer items-center gap-x-1"
          @click.prevent.stop="toggleLike"
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
