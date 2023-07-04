<script setup lang="ts">
import { useAuthStore } from '@/store/auth'

const auth = useAuthStore()
const dialog = useDialog()
const router = useRouter()

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
    <div class="border-l bg-white">
      <template v-if="auth.user">
        <div class="flex flex-col gap-x-2 text-center">
          <div class="h-20 w-20 rounded-full bg-white" />
          <div class="pt-3">{{ auth.user.name }}</div>
          <button @click="logout">로그아웃</button>
        </div>
      </template>
      <template v-else>
        <div class="flex flex-col gap-x-2 text-center">
          <div class="h-20 w-20 rounded-full bg-white" />
          <RouterLink class="pt-3" to="/signin">로그인</RouterLink>
          <RouterLink to="/signup">회원가입</RouterLink>
        </div>
      </template>
    </div>
  </div>
</template>
