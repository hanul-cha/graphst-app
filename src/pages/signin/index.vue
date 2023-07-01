<script setup lang="ts">
import { useAuthStore } from '@/store/auth'

const auth = useAuthStore()

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
  await auth.login(inputId.value, inputPassword.value)
}
</script>

<template>
  <div>
    <Validator @submit="signIn">
      <ValidateField
        v-slot="{ field, errorMessage }"
        v-model="inputId"
        name="id"
        roles="required"
      >
        <InputText v-bind="field" placeholder="id" :error="!!errorMessage" />
      </ValidateField>
      <ValidateField
        v-slot="{ field, errorMessage }"
        v-model="inputPassword"
        name="password"
        roles="required"
      >
        <InputText
          v-bind="field"
          placeholder="password"
          :error="!!errorMessage"
        />
      </ValidateField>
      <button type="submit">로그인</button>

      <div>
        비밀번호를 잊으셨나요?
        <RouterLink to="/signin/find-password">비밀번호 찾기</RouterLink>
      </div>

      <div>
        혹시 회원이 아니신가요?
        <RouterLink to="/signup">회원가입</RouterLink>
      </div>
    </Validator>
  </div>
</template>
