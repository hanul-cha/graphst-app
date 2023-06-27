<script setup lang="ts">
import { SignInDocument } from '@/api/graphql'

const { mutate, loading } = useMutation(SignInDocument)

const userData = ref('')
const inputId = ref<string | null>(null)
const inputPassword = ref<string | null>(null)
const dialog = useDialog()

async function signIn() {
  if (!inputId.value || !inputPassword.value) {
    await dialog.open({
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
  <div>
    <Validator @submit="signIn">
      <ValidateField v-model="inputId" name="id" roles="string" />
      <ValidateField v-model="inputPassword" name="password" roles="string" />
      <button type="submit">Load</button>
    </Validator>
  </div>
</template>
