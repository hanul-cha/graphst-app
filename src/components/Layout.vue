<script setup lang="ts">
import { useAuthStore } from '@/store/auth'
import { useGlobalActiveStore } from '@/store/globalActive'
import { DialogFollowType } from './dialog/follow/types'
import IconHome from './icons/IconHome.vue'
import IconPlus from './icons/IconPlus.vue'

const auth = useAuthStore()
const dialog = useDialog()
const router = useRouter()
const { active, closeAll, close } = useGlobalActiveStore()

const id = useRouteQuery<string | null>('id')
const follow = useRouteQuery<DialogFollowType | null>('follow')

const openRightSidebar = ref(false)
const $rightSidebar = ref<HTMLElement | null>(null)

const menuItems = [
  {
    label: '홈',
    icon: IconHome,
    path: '/',
  },
  {
    label: '포스팅 추가',
    icon: IconPlus,
    path: '/post/create',
  },
]

onMounted(async () => {
  await auth.getUser()
})

function openDialogFollow(type: DialogFollowType) {
  if (!auth.user) return
  follow.value = type
  id.value = auth.user.id
}

function closeDialogFollow() {
  follow.value = null
  id.value = null
}

async function open() {
  if (!$rightSidebar.value) return

  if (!openRightSidebar.value) {
    openRightSidebar.value = true
    await closeAll()
    active({
      key: 'right-sidebar',
      target: $rightSidebar.value,
      callback: () => {
        openRightSidebar.value = false
      },
    })
  } else {
    await close('right-sidebar')
  }
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
    <div class="flex w-28 flex-none flex-col items-center p-3 text-white">
      <template v-for="({ icon, path }, index) of menuItems" :key="index">
        <RouterLink class="block" :to="path"
          ><Component :is="icon" class="h-6 w-6 fill-white"
        /></RouterLink>
      </template>
    </div>
    <div
      class="relative flex h-full w-full flex-1 flex-col rounded-l-2xl bg-violet-50"
    >
      <div class="h-full flex-1 overflow-auto">
        <slot />
      </div>
    </div>
    <div
      ref="$rightSidebar"
      class="absolute right-0 top-0 z-20 flex h-full flex-col bg-white p-3 shadow-md transition-all duration-300"
      :class="{
        'translate-x-full': !openRightSidebar,
      }"
    >
      <div class="absolute -left-10 top-2" @click="open">
        <IconDoubleRight
          class="fill-gray-300 transition-transform duration-300"
          :class="{
            'rotate-180 ': !openRightSidebar,
          }"
        />
      </div>
      <template v-if="auth.user">
        <div class="mb-10 flex flex-none justify-center gap-x-2">
          <div class="h-20 w-20 rounded-full bg-white shadow-sm" />
          <div class="flex flex-col justify-center px-2">
            <div>{{ auth.user.name }}</div>
            <div>팔로워: {{ auth.user.countFollower }}</div>
          </div>
        </div>
      </template>
      <div class="h-full flex-1">
        <div
          class="flex flex-none flex-col items-center justify-center gap-y-2 px-14"
        >
          <div>내정보</div>
          <div @click="openDialogFollow(DialogFollowType.Follower)">팔로워</div>
          <div @click="openDialogFollow(DialogFollowType.Following)">
            팔로잉
          </div>
          <div>1대1 문의</div>
          <div>신고내역</div>
        </div>
      </div>
      <div class="flex-none">
        <template v-if="auth.user">
          <BasicButton class="w-full" @click="logout"> 로그아웃 </BasicButton>
        </template>
        <template v-else>
          <div class="flex flex-col gap-y-2">
            <RouterLink to="/signin"
              ><BasicButton class="w-full">로그인</BasicButton></RouterLink
            >
            <RouterLink to="/signup"
              ><BasicButton class="w-full">회원가입</BasicButton></RouterLink
            >
          </div>
        </template>
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
