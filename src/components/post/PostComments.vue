<script setup lang="ts">
import { CommentPaginationDocument, CreateCommentDocument } from '@/api/graphql'
import { useAuthStore } from '@/store/auth'
import { useFilterStore } from '@/store/filter'

export interface CommentsProps {
  postId: string
}

const props = defineProps<CommentsProps>()

const auth = useAuthStore()
const useFilter = useFilterStore()
const router = useRouter()

const { page, perPage } = useFilter.on({
  perPage: {
    type: Number,
    ignore: true,
    default: 20,
  },
  page: {
    type: Number,
    ignore: true,
    default: 1,
  },
})

const {
  result: pagination,
  loading,
  refetch,
} = useQuery(CommentPaginationDocument, () => ({
  perPage: perPage.value ? perPage.value : undefined,
  page: page.value ? page.value : undefined,
  postId: props.postId,
}))
const { mutate: createCommentMutation, loading: createCommentLoading } =
  useMutation(CreateCommentDocument)

const comments = computed(() => pagination.value?.comments?.nodes ?? [])
const totalCount = computed(() => pagination.value?.comments?.totalCount ?? 0)
const user = computed(() => auth.user)

const inputComment = ref<string | null>(null)

async function writeComment() {
  if (!user.value) {
    router.push('/signin')
    return
  }

  if (!inputComment.value || createCommentLoading.value) {
    return
  }

  const comment = await createCommentMutation({
    postId: props.postId,
    contents: inputComment.value,
  })

  // router.push(`/post/${props.postId}/comment/write`)
}
</script>

<template>
  <div>
    {{ comments }}
    {{ totalCount }}
    <div>
      <Validator
        class="flex w-80 flex-col gap-y-2 rounded-xl bg-white p-10"
        @submit="writeComment"
      >
        <template v-if="!user">
          <InputText model-value="로그인 후 이용가능합니다." disabled />
        </template>
        <template v-else>
          <ValidateField
            v-slot="{ field, errorMessage }"
            v-model="inputComment"
            name="댓글"
            roles="required"
          >
            <InputText
              v-bind="field"
              placeholder="댓글을 입력해 주세요"
              :error="!!errorMessage"
            />
          </ValidateField>
        </template>
        <BasicButton class="mt-6" type="submit">{{
          user ? '작성' : '로그인'
        }}</BasicButton>
      </Validator>
    </div>
  </div>
</template>
