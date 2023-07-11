<script setup lang="ts">
import { GetPostDocument } from '@/api/graphql'

interface PostEditProps {
  id?: string | null
}

interface PostEditEmits {
  (_e: 'submit', _value: any): void
}

const props = withDefaults(defineProps<PostEditProps>(), {
  id: '',
})

const emit = defineEmits<PostEditEmits>()

const { onResult } = useQuery(GetPostDocument, () => ({
  id: props.id ?? '',
}))
onResult((result) => {
  const post = result.data.getPost

  if (post) {
    inputTitle.value = post.title
    inputContents.value = post.contents
  }
})

const inputTitle = ref<string | null>(null)
const inputContents = ref<string | null>(null)
const dialog = useDialog()

const enableTagContents = computed(() => {
  return inputContents.value?.replace(/<[^>]*>?/gm, '') ?? ''
})

async function submit() {
  if (!inputTitle.value || !inputContents.value) {
    dialog.open({
      title: `${props.id ? '수정' : '작성'} 실패`,
      message: '필수 입력값을 확인해주세요.',
      confirmText: '확인',
    })
    return
  }
  emit('submit', {
    title: inputTitle.value,
    contents: inputContents.value,
  })
}
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-center gap-y-4">
    <Validator
      class="flex flex-col gap-y-2 rounded-xl bg-white p-10"
      @submit="submit"
    >
      <ValidateField
        v-slot="{ field, errorMessage }"
        v-model="inputTitle"
        name="제목"
        :roles="{
          required: true,
          min: 4,
          max: 20,
        }"
      >
        <InputText v-bind="field" placeholder="제목" :error="!!errorMessage" />
      </ValidateField>
      <ValidateField
        v-model="inputContents"
        name="내용"
        :roles="{
          custom: enableTagContents.length > 9,
        }"
      >
        <template #default="{ field, errorMessage }">
          <InputEditor
            v-bind="field"
            placeholder="10자 이상 입력해주세요."
            :error="!!errorMessage"
          />
        </template>
        <template #error>
          <div class="block text-xs text-red-500">
            내용은 10자 이상 입력해주세요.
          </div>
        </template>
      </ValidateField>
      <BasicButton class="mt-6" type="submit"> 발행하기 </BasicButton>
    </Validator>
  </div>
</template>
