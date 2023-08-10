<script setup lang="ts">
import {
  GetCategoryAllDocument,
  CreatePostMutationVariables,
  PostDetailFragment,
} from '@/api/graphql'

interface PostEditProps {
  loading?: boolean
  post?: PostDetailFragment | null
}
interface PostEditEmits {
  (_e: 'submit', _value: CreatePostMutationVariables): void
}

const props = withDefaults(defineProps<PostEditProps>(), {
  loading: false,
  post: null,
})
const emit = defineEmits<PostEditEmits>()

const { result } = useQuery(GetCategoryAllDocument)
const format = useFormat()

onMounted(() => {
  if (!props.post) return
  setInput(props.post)
})
watch(
  () => props.post,
  (post) => {
    if (!post) return
    setInput(post)
  }
)

function setInput(post: PostDetailFragment) {
  inputTitle.value = post.title
  inputContents.value = post.contents
  inputCategoryId.value = post.category?.id ?? null
  inputActive.value = post.activeAt
}

const inputTitle = ref<string | null>(null)
const inputContents = ref<string | null>(null)
const inputActive = ref(false)
const inputCategoryId = ref<string | null>(null)
const dialog = useDialog()

const enableTagContents = computed(() => {
  return (
    (inputContents.value ? format.removeHtmlTag(inputContents.value) : '')
      .length >= 10
  )
})

const categoryOptions = computed<
  {
    label: string
    value: string | null
  }[]
>(() => [
  ...(result.value?.categories
    ? result.value.categories.map(({ id, label }) => ({
        label,
        value: id,
      }))
    : []),
  {
    label: '카테고리 없음',
    value: null,
  },
])

async function submit() {
  if (!inputTitle.value || !inputContents.value) {
    dialog.open({
      title: `${props.post ? '수정' : '작성'} 실패`,
      message: '필수 입력값을 확인해주세요.',
      confirmText: '확인',
    })
    return
  }
  emit('submit', {
    title: inputTitle.value,
    contents: inputContents.value,
    activeAt: inputActive.value,
    categoryId: inputCategoryId.value,
  })
}
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-center">
    <Validator
      class="flex h-full w-full flex-col gap-y-2 rounded-xl bg-white p-10"
      @submit="submit"
    >
      <ValidateField
        v-slot="{ errorMessage }"
        :model-value="inputTitle"
        name="제목"
        :roles="{
          required: true,
          min: 4,
          max: 40,
        }"
      >
        <InputText
          v-model:model-value="inputTitle"
          placeholder="제목"
          :error="!!errorMessage"
        />
      </ValidateField>

      <ValidateField
        v-slot="{ errorMessage }"
        :model-value="inputActive"
        name="활성화"
      >
        <div class="flex items-center gap-x-2">
          <InputCheckToggle
            v-model:model-value="inputActive"
            :error="!!errorMessage"
          />
          <div class="text-xs">포스팅 활성화</div>
        </div>
      </ValidateField>
      <ValidateField v-slot="{ errorMessage }" name="카테고리">
        <InputSelect
          v-model:model-value="inputCategoryId"
          :error="!!errorMessage"
          :options="categoryOptions"
        />
      </ValidateField>
      <ValidateField
        class="h-full"
        :model-value="inputContents"
        name="내용"
        :roles="{
          custom: enableTagContents,
        }"
      >
        <template #default="{ errorMessage }">
          <InputEditor
            v-model:model-value="inputContents"
            class="flex h-full flex-col overflow-x-auto"
            placeholder="10자 이상 입력해주세요."
            :error="!!errorMessage"
          />
        </template>
        <template #error>
          <div class="text-xs text-red-500">내용은 10자 이상 입력해주세요.</div>
        </template>
      </ValidateField>
      <BasicButton :disabled="loading" class="mt-6" type="submit">
        {{ props.post ? '수정완료' : '작성완료' }}
      </BasicButton>
    </Validator>
  </div>
</template>
