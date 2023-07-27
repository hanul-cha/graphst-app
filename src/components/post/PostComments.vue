<script setup lang="ts">
import {
  CommentFullFragment,
  CommentPaginationDocument,
  CreateCommentDocument,
  DeleteCommentDocument,
  ToggleLikeCommentDocument,
  ToggleUnlikeCommentDocument,
} from '@/api/graphql'
import { useAuthStore } from '@/store/auth'
import { useFilterStore } from '@/store/filter'

export interface CommentsProps {
  postId: string
}

const props = defineProps<CommentsProps>()

const auth = useAuthStore()
const useFilter = useFilterStore()
const router = useRouter()
const dialog = useDialog()

const { page, perPage } = useFilter.on({
  perPage: {
    type: Number,
    ignore: true,
    default: 5,
  },
  page: {
    type: Number,
    ignore: true,
    default: 1,
  },
})

const { result, refetch } = useQuery(CommentPaginationDocument, () => ({
  perPage: perPage.value ? perPage.value : undefined,
  page: page.value ? page.value : undefined,
  postId: props.postId,
}))

const { mutate: createCommentMutation, loading: createCommentLoading } =
  useMutation(CreateCommentDocument)
const { mutate: deleteCommentMutation, loading: deleteCommentLoading } =
  useMutation(DeleteCommentDocument)
const { mutate: toggleLikeCommentMutation, loading: toggleLikeCommentLoading } =
  useMutation(ToggleLikeCommentDocument)
const {
  mutate: toggleUnlikeCommentMutation,
  loading: toggleUnlikeCommentLoading,
} = useMutation(ToggleUnlikeCommentDocument)

const user = computed(() => auth.user)
const comments = computed(() => result.value?.comments?.nodes ?? [])
const totalCount = computed(() => result.value?.comments?.totalCount ?? 0)

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

  inputComment.value = null

  if (comment?.data?.comment) {
    if (page.value === 1) {
      await refetch()
      return
    }
    page.value = 1
  }
}

async function deleteComment(comment: CommentFullFragment) {
  if (deleteCommentLoading.value) {
    return
  }
  if (!user.value || user.value.id !== comment.user.id) {
    await dialog.open({
      title: '수정권한이 없습니다.',
      confirmText: '확인',
    })
    return
  }

  const confirm = await dialog.open({
    title: '댓글 삭제',
    message: '댓글을 삭제하시겠습니까?',
    confirmText: '삭제',
  })

  if (!confirm) return

  const result = await deleteCommentMutation({
    commentId: comment.id,
  })

  if (result?.data?.result) {
    if (page.value === 1) {
      await refetch()
      return
    }
    page.value = 1
  }
}

async function toggleLike(comment: CommentFullFragment) {
  if (toggleLikeCommentLoading.value || toggleUnlikeCommentLoading.value) {
    return
  }
  if (!user.value) {
    const confirm = await dialog.open({
      title: '로그인이 필요합니다',
      message: '로그인하러 가시겠습니까?',
      confirmText: '로그인',
    })
    if (confirm) {
      router.push('/signin')
    }
    return
  }

  await toggleLikeCommentMutation({
    targetId: comment.id,
    like: !comment.isLike,
  })

  await refetch()
}

async function toggleUnlike(comment: CommentFullFragment) {
  if (toggleLikeCommentLoading.value || toggleUnlikeCommentLoading.value) {
    return
  }
  if (!user.value) {
    const confirm = await dialog.open({
      title: '로그인이 필요합니다',
      message: '로그인하러 가시겠습니까?',
      confirmText: '로그인',
    })
    if (confirm) {
      router.push('/signin')
    }
    return
  }

  await toggleUnlikeCommentMutation({
    targetId: comment.id,
    like: !comment.isUnlike,
  })

  await refetch()
}
</script>

<template>
  <div>
    <div class="rounded-xl border p-4">
      <div class="pb-4 font-semibold">Comments ({{ totalCount }})</div>
      <div class="pb-4">
        <Validator class="flex flex-col rounded-xl" @submit="writeComment">
          <template v-if="!user">
            <InputText
              class="w-full"
              model-value="로그인 후 이용가능합니다."
              disabled
            />
          </template>
          <template v-else>
            <ValidateField
              v-slot="{ field, errorMessage }"
              v-model="inputComment"
              name="댓글"
              roles="required"
            >
              <InputText
                class="w-full"
                v-bind="field"
                placeholder="댓글을 입력해 주세요"
                :error="!!errorMessage"
              />
            </ValidateField>
          </template>
          <div class="flex justify-end pt-2">
            <BasicButton class="w-16" type="submit">{{
              user ? '작성' : '로그인'
            }}</BasicButton>
          </div>
        </Validator>
      </div>
      <div class="divide-y divide-gray-100">
        <template v-for="(comment, index) of comments" :key="index">
          <div class="flex gap-x-2 py-4">
            <div
              class="h-10 w-10 flex-none rounded-full bg-white shadow-inner"
            />
            <div class="w-full">
              <div class="flex w-full justify-between pb-2">
                <div>
                  <span class="text-sm font-bold">{{ comment.user.name }}</span>
                </div>
                <div
                  v-if="comment.isMyComment"
                  class="cursor-pointer hover:text-red-500"
                  @click="deleteComment(comment)"
                >
                  삭제
                </div>
              </div>
              <div class="text-xs">{{ comment.contents }}</div>
              <div class="flex justify-end pt-4">
                <div class="flex gap-x-2">
                  <div
                    class="flex cursor-pointer gap-x-1"
                    @click="toggleLike(comment)"
                  >
                    <div class="translate-y-1">
                      <IconFillLike v-if="comment.isLike" class="h-5 w-5" />
                      <IconLineLike v-else class="h-5 w-5" />
                    </div>
                    <div>{{ comment.countLike }}</div>
                  </div>

                  <div
                    class="flex cursor-pointer gap-x-1"
                    @click="toggleUnlike(comment)"
                  >
                    <div class="rotate-180">
                      <IconFillLike v-if="comment.isUnlike" class="h-5 w-5" />
                      <IconLineLike v-else class="h-5 w-5" />
                    </div>
                    <div>{{ comment.countUnlike }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="flex justify-center">
        <template v-if="totalCount > 0">
          <Pagination
            v-model:page="page"
            v-model:perPage="perPage"
            :per-page-option="5"
            :total="totalCount"
            @update:per-page="5"
          />
        </template>
        <template v-else>
          <Pagination
            v-model:page="page"
            v-model:perPage="perPage"
            :per-page-option="5"
            :total="1"
            @update:per-page="5"
          />
        </template>
      </div>
    </div>
  </div>
</template>
