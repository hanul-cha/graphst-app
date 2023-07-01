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
  <div class="absolute inset-0 flex min-h-full flex-col">
    <div
      class="flex w-full flex-none justify-end rounded-b-2xl bg-yellow-400 p-3 text-white"
    >
      <template v-if="auth.user">
        <div class="flex gap-x-2">
          <div>
            <div class="h-6 w-6 rounded-full bg-white" />
          </div>
          <div>{{ auth.user.name }}</div>
          <button @click="logout">로그아웃</button>
        </div>
      </template>
      <template v-else>
        <div class="flex gap-x-2">
          <div>
            <div class="h-6 w-6 rounded-full bg-white" />
          </div>
          <RouterLink to="/signin">로그인</RouterLink>
          <RouterLink to="/signup">회원가입</RouterLink>
        </div>
      </template>
    </div>
    <div class="relative h-full w-full flex-1 overflow-auto">
      <slot />
    </div>
  </div>
</template>
