<script setup lang="ts">
import { SignInDocument } from '@/api/graphql'

const { mutate, loading } = useMutation(SignInDocument)

const userData = ref('')
const inputId = ref<string | null>(null)
const inputPassword = ref<string | null>(null)
const dialog = useDialog()

async function signIn() {
  if (!inputId.value || !inputPassword.value) {
    dialog.open({
      title: '로그인 실패',
      message: '아이디와 비밀번호를 입력해주세요.',
      confirmText: '확인',
    })
    return
  }
  const result = await mutate({
    id: inputId.value,
    password: inputPassword.value,
  })

  userData.value = result?.data?.signIn ?? ''
}
</script>

<template>
  <div>{{ userData }}</div>
  <div>
    <input v-model="inputId" />
  </div>
  <div>
    <input v-model="inputPassword" />
  </div>
  <div>{{ loading }}</div>
  <button @click="signIn()">Load</button>
</template>
