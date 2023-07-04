<script setup lang="ts">
import { useAuthStore } from '@/store/auth'

const auth = useAuthStore()
const dialog = useDialog()
const router = useRouter()

const openRightSidebar = ref(false)

onMounted(async () => {
  await auth.getUser()
})

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
  <div class="absolute inset-0 flex min-h-full bg-origin">
    <div class="flex w-28 flex-none flex-col items-center p-3 text-white"></div>
    <div
      class="relative h-full w-full flex-1 overflow-auto rounded-l-2xl bg-violet-50"
    >
      <slot />
    </div>
    <div
      class="absolute right-0 top-0 flex h-full flex-col bg-white p-3 shadow-md transition-all duration-300"
      :class="{
        'translate-x-full': !openRightSidebar,
      }"
    >
      <div
        class="absolute -left-10 top-2"
        @click="openRightSidebar = !openRightSidebar"
      >
        <IconDoubleRight
          class="fill-current text-gray-300 transition-transform duration-300"
          :class="{
            'rotate-180 text-gray-400': !openRightSidebar,
          }"
        />
      </div>
      <template v-if="auth.user">
        <div class="mb-10 flex flex-none justify-center gap-x-2">
          <div class="h-20 w-20 rounded-full bg-white shadow-sm" />
          <div class="flex flex-col items-center justify-center px-2">
            <div>{{ auth.user.name }}</div>
            <div>팔로워</div>
          </div>
        </div>
      </template>
      <div class="h-full flex-1">
        <div
          class="flex flex-none flex-col items-center justify-center gap-y-2 px-14"
        >
          <div>내정보</div>
          <div>팔로워</div>
          <div>팔로우</div>
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
            <BasicButton
              ><RouterLink to="/signin">로그인</RouterLink></BasicButton
            >
            <BasicButton
              ><RouterLink to="/signup">회원가입</RouterLink></BasicButton
            >
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
