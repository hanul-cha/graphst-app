<script setup lang="ts">
import { useAuthStore } from '@/store/auth'
import { DialogFollowType } from './dialog/follow/types'

interface MenuItem {
  label: string
  action: () => void
}

const auth = useAuthStore()
const dialog = useDialog()
const router = useRouter()

const id = useRouteQuery<string | null>('id')
const follow = useRouteQuery<DialogFollowType | null>('follow')

const openRightSidebar = ref(false)

const menuItems: MenuItem[] = [
  {
    label: '홈',
    action: () => router.push('/'),
  },
  {
    label: '포스팅 작성',
    action: () => router.push('/post/create'),
  },
  {
    label: '팔로워',
    action: () => openDialogFollow(DialogFollowType.Follower),
  },
  {
    label: '팔로잉',
    action: () => openDialogFollow(DialogFollowType.Following),
  },
]

onMounted(async () => {
  if (!auth.user) {
    await auth.getUser()
  }
})

async function openDialogFollow(type: DialogFollowType) {
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
  follow.value = type
  id.value = auth.user.id
}

function closeDialogFollow() {
  follow.value = null
  id.value = null
}

function open() {
  openRightSidebar.value = !openRightSidebar.value
}

async function logout() {
  const result = await dialog.open({
    title: '로그아웃',
    message: '로그아웃 하시겠어요?',
    confirmText: '확인',
    cancelText: '취소',
  })

  if (result) {
    auth.logout()
    router.push('/signin')
  }
}
</script>

<template>
  <div class="absolute inset-0 flex min-h-full overflow-x-hidden bg-current">
    <div
      class="relative flex h-full w-full flex-1 flex-col bg-violet-50 transition-all duration-500"
      :class="{
        'rounded-r-2xl': openRightSidebar,
      }"
    >
      <div class="relative h-full flex-1 overflow-auto">
        <slot />
        <div class="absolute right-4 top-4 cursor-pointer" @click="open">
          <IconDoubleRight
            class="fill-gray-300 transition-transform duration-300"
            :class="{
              'rotate-180 ': !openRightSidebar,
            }"
          />
        </div>
      </div>
    </div>
    <div
      class="h-full overflow-hidden bg-current transition-all duration-700"
      :class="{
        'max-w-0': !openRightSidebar,
        'max-w-full': openRightSidebar,
      }"
    >
      <div
        class="flex h-full flex-col p-3 transition-all delay-200 duration-500"
        :class="{
          'translate-x-full opacity-0': !openRightSidebar,
        }"
      >
        <template v-if="auth.user">
          <div class="mb-10 flex flex-none items-center justify-center gap-x-2">
            <div class="flex h-20 w-20 items-center justify-center">
              <div
                class="rounded-full bg-white shadow-sm transition-all duration-500"
                :class="{
                  'h-0 w-0': !openRightSidebar,
                  'h-20 w-20': openRightSidebar,
                }"
              />
            </div>
            <div class="flex flex-col justify-center px-2 text-white">
              <div>{{ auth.user.name }}</div>
              <div>팔로워: {{ auth.user.countFollower }}</div>
              <div>팔로잉: {{ auth.user.countFollowing }}</div>
            </div>
          </div>
        </template>
        <div class="h-full flex-1">
          <div class="flex flex-col gap-y-2 px-5">
            <template v-for="(item, index) of menuItems" :key="index">
              <div
                class="cursor-pointer rounded-full p-1 pl-[8px] text-white hover:bg-white hover:text-current"
                @click="item.action"
              >
                {{ item.label }}
              </div>
            </template>
          </div>
        </div>
        <div class="flex-none">
          <template v-if="auth.user">
            <div
              class="w-full cursor-pointer rounded-full p-1 pl-[8px] text-center text-white hover:bg-white hover:text-current"
              @click="logout"
            >
              로그아웃
            </div>
          </template>
          <template v-else>
            <div class="flex flex-col gap-y-2">
              <RouterLink to="/signin"
                ><div
                  class="w-full cursor-pointer rounded-full p-1 pl-[8px] text-center text-white hover:bg-white hover:text-current"
                >
                  로그인
                </div></RouterLink
              >
              <RouterLink to="/signup"
                ><div
                  class="w-full cursor-pointer rounded-full p-1 pl-[8px] text-center text-white hover:bg-white hover:text-current"
                >
                  회원가입
                </div></RouterLink
              >
            </div>
          </template>
        </div>
      </div>
    </div>
    <DialogFollow
      v-if="follow && id"
      v-model:type="follow"
      :target-id="id"
      @close="closeDialogFollow"
      @cancel="closeDialogFollow"
    />
  </div>
</template>
