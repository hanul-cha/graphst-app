<script setup lang="ts">
import { AuthQuestion, SignUpDocument } from '@/api/graphql'

const dialog = useDialog()
const router = useRouter()

const { mutate, loading } = useMutation(SignUpDocument)

const inputUserId = ref<string | null>()
const inputPassword = ref<string | null>(null)
const inputPasswordDup = ref<string | null>(null)
const inputName = ref<string | null>(null)
const inputQuestionForSearch = ref<AuthQuestion>()
const inputAnswerForSearch = ref<string | null>(null)

async function signUp() {
  if (loading.value) return
  if (
    !inputUserId.value ||
    !inputPassword.value ||
    !inputPasswordDup.value ||
    !inputName.value ||
    !inputAnswerForSearch.value ||
    !inputQuestionForSearch.value
  ) {
    await dialog.open({
      title: '회원가입 실패',
      message: '필수 입력값을 확인해주세요',
      confirmText: '확인',
    })
    return
  }

  if (inputPassword.value !== inputPasswordDup.value) {
    await dialog.open({
      title: '회원가입 실패',
      message: '비밀번호가 일치하지 않습니다.',
      confirmText: '확인',
    })
    return
  }

  const result = await mutate({
    userId: inputUserId.value,
    password: inputPassword.value,
    name: inputName.value,
    questionForSearch: inputQuestionForSearch.value,
    answerForSearch: inputAnswerForSearch.value,
  })

  if (result?.data?.signUp?.id) {
    await dialog.open({
      title: '회원가입 완료!',
      confirmText: '확인',
    })
    router.push('/signin')
  } else {
    throw new Error('signUp.id is null')
  }
}
</script>

<template>
  <div class="flex h-full w-full items-center justify-center">
    <Validator
      class="flex w-80 flex-col rounded-xl bg-white p-10"
      @submit="signUp"
    >
      <div class="flex flex-col gap-y-2">
        <ValidateField
          v-slot="{ errorMessage }"
          :model-value="inputUserId"
          name="id"
          :roles="{
            required: true,
            min: 6,
            max: 12,
          }"
        >
          <InputText
            v-model:model-value="inputUserId"
            placeholder="id"
            :error="!!errorMessage"
          />
        </ValidateField>
        <ValidateField
          v-slot="{ errorMessage }"
          :model-value="inputName"
          name="사용자이름"
          :roles="{
            required: true,
            min: 2,
            max: 10,
          }"
        >
          <InputText
            v-model:model-value="inputName"
            placeholder="사용자 이름"
            :error="!!errorMessage"
          />
        </ValidateField>
        <ValidateField
          v-slot="{ errorMessage }"
          :model-value="inputPassword"
          name="비밀번호"
          roles="password"
        >
          <InputPassword
            v-model:model-value="inputPassword"
            placeholder="영문, 숫자포함 6~12자리"
            :error="!!errorMessage"
          />
        </ValidateField>
        <ValidateField
          :model-value="inputPasswordDup"
          name="비밀번호확인"
          :roles="{
            required: true,
            custom: inputPassword === inputPasswordDup,
          }"
        >
          <template #default="{ errorMessage }">
            <InputPassword
              v-model:model-value="inputPasswordDup"
              placeholder="비밀번호 확인"
              :error="!!errorMessage"
            />
          </template>
          <template #error>
            <div class="block text-xs text-red-500">
              입력한 비밀번호와 같아야합니다.
            </div>
          </template>
        </ValidateField>
        <ValidateField
          v-slot="{ errorMessage }"
          :model-value="inputQuestionForSearch"
          name="본인확인질문"
          roles="required"
        >
          <InputSelect
            v-model:model-value="inputQuestionForSearch"
            :error="!!errorMessage"
            :options="$format.questionOptions"
            placeholder="본인확인 질문을 선택해 주세요"
          />
        </ValidateField>
        <ValidateField
          v-slot="{ errorMessage }"
          :model-value="inputAnswerForSearch"
          name="본인확인답변"
          :roles="{
            required: true,
            min: 2,
            max: 20,
          }"
        >
          <InputText
            v-model:model-value="inputAnswerForSearch"
            placeholder="본인확인 답변"
            :error="!!errorMessage"
          />
        </ValidateField>
      </div>
      <BasicButton class="mt-6" type="submit"> 회원가입 </BasicButton>
    </Validator>
  </div>
</template>
