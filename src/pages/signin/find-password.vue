<script setup lang="ts">
import {
  AuthQuestion,
  ValidateQuestionDocument,
  ChangePasswordDocument,
} from '@/api/graphql'

const dialog = useDialog()
const router = useRouter()

const { mutate: validateQuestionMutation, loading: validateQuestionLoading } =
  useMutation(ValidateQuestionDocument)
const { mutate: changePasswordMutation, loading: changePasswordLoading } =
  useMutation(ChangePasswordDocument)

const loading = computed(
  () => validateQuestionLoading.value || changePasswordLoading.value
)

const inputUserId = ref<string | null>(null)
const inputQuestionForSearch = ref<AuthQuestion | null>(null)
const inputAnswerForSearch = ref<string | null>(null)

const validateQuestionResult = ref(false)

const inputPassword = ref<string | null>(null)
const inputPasswordDup = ref<string | null>(null)

async function validateQuestion() {
  if (loading.value) return
  if (
    !inputUserId.value ||
    !inputQuestionForSearch.value ||
    !inputAnswerForSearch.value
  ) {
    await dialog.open({
      title: '비밀번호 찾기 실패',
      message: '필수 입력값을 확인해주세요.',
      confirmText: '확인',
    })
    return
  }

  const result = await validateQuestionMutation({
    userId: inputUserId.value,
    questionForSearch: inputQuestionForSearch.value,
    answerForSearch: inputAnswerForSearch.value,
  })

  if (result?.data?.result) {
    validateQuestionResult.value = true
  } else {
    await dialog.open({
      title: '비밀번호 찾기 실패',
      message: '아이디, 본인확인 질문, 본인확인 답변을 확인해주세요.',
      confirmText: '확인',
    })
  }
}

async function changePassword() {
  if (loading.value) return
  if (!inputPassword.value || !inputPasswordDup.value) {
    await dialog.open({
      title: '비밀번호 변경 실패',
      message: '필수 입력값을 확인해주세요.',
      confirmText: '확인',
    })
    return
  }

  await changePasswordMutation({
    userId: inputUserId.value!,
    password: inputPassword.value,
  })

  await dialog.open({
    title: '비밀번호 변경 완료!',
    confirmText: '확인',
  })

  router.push('/signin')
}
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-center gap-y-4">
    <Validator
      v-show="!validateQuestionResult"
      class="flex w-80 flex-col gap-y-2 rounded-xl bg-white p-10"
      @submit="validateQuestion"
    >
      <ValidateField
        v-slot="{ field, errorMessage }"
        v-model="inputUserId"
        name="id"
        roles="required"
      >
        <InputText v-bind="field" placeholder="id" :error="!!errorMessage" />
      </ValidateField>
      <ValidateField
        v-slot="{ field, errorMessage }"
        v-model="inputQuestionForSearch"
        name="본인확인질문"
        roles="required"
      >
        <InputSelect
          v-bind="field"
          :error="!!errorMessage"
          :options="$format.questionOptions"
          placeholder="본인확인 질문을 선택해 주세요"
        />
      </ValidateField>
      <ValidateField
        v-slot="{ field, errorMessage }"
        v-model="inputAnswerForSearch"
        name="본인확인답변"
        roles="required"
      >
        <InputText
          v-bind="field"
          placeholder="본인확인 답변"
          :error="!!errorMessage"
        />
      </ValidateField>
      <BasicButton class="mt-6" type="submit">본인확인 체크</BasicButton>
    </Validator>
    <Validator
      v-show="validateQuestionResult"
      class="flex w-80 flex-col gap-y-2 rounded-xl bg-white p-10"
      @submit="changePassword"
    >
      <ValidateField
        v-slot="{ field, errorMessage }"
        v-model="inputPassword"
        name="비밀번호"
        roles="password"
      >
        <InputPassword
          v-bind="field"
          placeholder="영문, 숫자포함 6~12자리"
          :error="!!errorMessage"
        />
      </ValidateField>
      <ValidateField
        v-model="inputPasswordDup"
        name="비밀번호확인"
        :roles="{
          required: true,
          custom: inputPassword === inputPasswordDup,
        }"
      >
        <template #default="{ field, errorMessage }">
          <InputText
            v-bind="field"
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
      <BasicButton class="mt-6" type="submit">비밀번호 변경</BasicButton>
    </Validator>
  </div>
</template>
