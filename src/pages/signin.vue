<script setup lang="ts">
import { SignInDocument } from '@/api/graphql'

const { mutate, loading } = useMutation(SignInDocument)

const userData = ref('')
const inputId = ref<string | null>('asdf')
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
      <ValidateField
        v-slot="{ field, errorMessage }"
        v-model="inputId"
        name="id"
        :roles="{
          required: true,
          min: 4,
          max: 12,
        }"
      >
        <input
          v-bind="field"
          placeholder="id"
          :error="errorMessage"
          class="w-full rounded-2xl border p-2 focus:outline-none"
          type="text"
        />
      </ValidateField>
      <ValidateField
        v-slot="{ field, errorMessage }"
        v-model="inputPassword"
        name="password"
        :roles="'password'"
      >
        <input
          v-bind="field"
          placeholder="영문, 숫자포함 6~12자리여야 합니다."
          :error="errorMessage"
          class="w-full rounded-2xl border p-2 focus:outline-none"
          type="text"
        />
      </ValidateField>
      <button type="submit">로그인</button>
    </Validator>
  </div>
</template>
