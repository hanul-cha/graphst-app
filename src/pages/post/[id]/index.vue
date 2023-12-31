<script setup lang="ts">
import {
  DeletePostDocument,
  GetPostDocument,
  UserFullFragment,
} from '@/api/graphql'
import { useAuthStore } from '@/store/auth'

const id = useRouteParams<string>('id')
const auth = useAuthStore()
const router = useRouter()
const dialog = useDialog()

const { result, loading } = useQuery(GetPostDocument, () => ({
  id: id.value,
}))
const { mutate, loading: mutationLoading } = useMutation(DeletePostDocument)

const post = computed(() => result.value?.getPost)

async function updateUser(user: UserFullFragment) {
  if (!result.value?.getPost) return
  result.value = {
    ...result.value,
    getPost: {
      ...result.value.getPost,
      user,
    },
  }
}

async function deletePost() {
  if (!post.value || mutationLoading.value) return

  if (post.value.user.id !== auth.user?.id) {
    await dialog.open({
      title: '권한이 없습니다.',
      confirmText: '확인',
    })
    return
  }

  const confirm = await dialog.open({
    title: '포스팅을 삭제하시겠습니까?',
    message: '삭제된 포스팅은 복구할 수 없습니다.',
    confirmText: '확인',
    cancelText: '취소',
  })

  if (!confirm) {
    return
  }

  await mutate({
    id: post.value.id,
  })

  await dialog.open({
    title: '포스팅 삭제 완료',
    confirmText: '확인',
  })

  router.replace('/post?my=true')
}
</script>

<template>
  <template v-if="loading">
    <LayoutInner>
      <div class="pb-4 text-2xl font-bold">로딩중...</div>
    </LayoutInner>
  </template>
  <template v-else-if="!post">
    <LayoutInner>
      <div class="pb-4 text-2xl font-bold">포스팅이 없습니다.</div>
    </LayoutInner>
  </template>
  <template v-else>
    <LayoutInner>
      <template #header>
        <div
          v-if="post.category?.label"
          class="flex items-center gap-x-1 pb-4 text-current"
        >
          카테고리: {{ post.category?.label }}
        </div>

        <UserCard
          class="mb-5 flex-none"
          :user="post.user"
          @update:user="updateUser"
        />
      </template>
      <div>
        <div class="flex justify-between">
          <div class="pb-2 text-3xl font-extrabold">{{ post.title }}</div>
          <div
            v-if="post.user.id === auth.user?.id"
            class="flex flex-none gap-x-2"
          >
            <div
              class="cursor-pointer text-blue-500"
              @click="$router.replace(`/post/${post.id}/edit`)"
            >
              수정
            </div>
            <div class="cursor-pointer text-red-500" @click="deletePost">
              삭제
            </div>
          </div>
        </div>
        <InputEditor :model-value="post.contents" readonly />
      </div>
      <div class="flex justify-end pb-4 pt-10">
        <div class="text-xs">
          <div>
            작성일: {{ $format.date(post.createAt, 'yyyy년MM월dd일HH시mm분') }}
          </div>
          <div>
            마지막 수정일:
            {{ $format.date(post.updateAt, 'yyyy년MM월dd일HH시mm분') }}
          </div>
        </div>
      </div>
      <PostComments class="pt-2" :post-id="id" />
    </LayoutInner>
  </template>
</template>
