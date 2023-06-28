<script setup lang="ts">
import { AuthQuestion, SignUpDocument } from '@/api/graphql'

const dialog = useDialog()
const router = useRouter()

const { mutate, loading } = useMutation(SignUpDocument)

const inputUserId = ref<string | null>(null)
const inputPassword = ref<string | null>(null)
const inputName = ref<string | null>(null)
const inputQuestionForSearch = ref<AuthQuestion>(AuthQuestion.FavoriteColor)
const inputAnswerForSearch = ref<string | null>(null)

async function signUp() {
  if (
    !inputUserId.value ||
    !inputPassword.value ||
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
  const result = await mutate({
    userId: inputUserId.value,
    password: inputPassword.value,
    name: inputName.value,
    questionForSearch: inputQuestionForSearch.value,
    answerForSearch: inputAnswerForSearch.value,
  })

  if (result?.data?.signUp?.id) {
    await dialog.open({
      title: '회원가입 성공',
      message: '회원가입에 성공했습니다.',
      confirmText: '확인',
    })
    router.push('/signin')
  } else {
    await dialog.open({
      title: '회원가입 실패',
      message: '같은 현상이 발생하면 1대1 문의를 이용해주세요.',
      confirmText: '확인',
    })
  }
}
</script>

<template>
  <div>
    <Validator @submit="signUp">
      <ValidateField
        v-slot="{ field, errorMessage }"
        v-model="inputUserId"
        name="userId"
        :roles="{
          required: true,
          min: 6,
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
        v-model="inputName"
        name="name"
        :roles="{
          required: true,
          min: 2,
          max: 10,
        }"
      >
        <input
          v-bind="field"
          placeholder="사용자 이름"
          :error="errorMessage"
          class="w-full rounded-2xl border p-2 focus:outline-none"
          type="text"
        />
      </ValidateField>
      <ValidateField
        v-slot="{ field, errorMessage }"
        v-model="inputPassword"
        name="password"
        roles="password"
      >
        <input
          v-bind="field"
          placeholder="영문, 숫자포함 6~12자리여야 합니다."
          :error="errorMessage"
          class="w-full rounded-2xl border p-2 focus:outline-none"
          type="text"
        />
      </ValidateField>
      <ValidateField
        v-slot="{ field, errorMessage }"
        v-model="inputQuestionForSearch"
        name="questionForSearch"
        roles="required"
      >
        <input
          v-bind="field"
          placeholder="본인확인 질문"
          :error="errorMessage"
          class="w-full rounded-2xl border p-2 focus:outline-none"
          type="text"
        />
      </ValidateField>
      <ValidateField
        v-slot="{ field, errorMessage }"
        v-model="inputAnswerForSearch"
        name="본인확인답변"
        :roles="{
          required: true,
          min: 2,
          max: 20,
        }"
      >
        <input
          v-bind="field"
          placeholder="본인확인 답변"
          :error="errorMessage"
          class="w-full rounded-2xl border p-2 focus:outline-none"
          type="text"
        />
      </ValidateField>
      <button type="submit">회원가입</button>
    </Validator>
  </div>
</template>
