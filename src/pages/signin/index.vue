<script setup lang="ts">
import { useAuthStore } from '@/store/auth'

const auth = useAuthStore()

const inputId = ref<string | null>(null)
const inputPassword = ref<string | null>(null)
const dialog = useDialog()
const router = useRouter()

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

  router.back()
}
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-center gap-y-4">
    <Validator
      class="flex w-80 flex-col gap-y-2 rounded-xl bg-white p-10"
      @submit="signIn"
    >
      <ValidateField
        v-slot="{ errorMessage }"
        :model-value="inputId"
        name="id"
        roles="required"
      >
        <InputText
          v-model:model-value="inputId"
          placeholder="id"
          :error="!!errorMessage"
        />
      </ValidateField>
      <ValidateField
        v-slot="{ errorMessage }"
        :model-value="inputPassword"
        name="password"
        roles="required"
      >
        <InputPassword
          v-model:model-value="inputPassword"
          placeholder="password"
          :error="!!errorMessage"
        />
      </ValidateField>
      <BasicButton class="mt-6" type="submit"> 로그인 </BasicButton>
    </Validator>
    <div class="flex gap-x-1">
      <div>
        <RouterLink class="hover:text-current" to="/signin/find-password"
          >비밀번호 찾기</RouterLink
        >
      </div>
      <div>/</div>
      <div>
        <RouterLink class="hover:text-current" to="/signup"
          >회원가입</RouterLink
        >
      </div>
    </div>
  </div>
</template>
