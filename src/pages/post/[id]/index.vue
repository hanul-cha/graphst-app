<script setup lang="ts">
import { GetPostDocument } from '@/api/graphql'
import { useAuthStore } from '@/store/auth'

const id = useRouteParams<string>('id')
const auth = useAuthStore()
const router = useRouter()
const dialog = useDialog()

const { result, loading } = useQuery(GetPostDocument, () => ({
  id: id.value,
}))

const post = computed(() => result.value?.getPost)
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
          <div class="h-[1px] w-2 bg-current" />
          카테고리: {{ post.category?.label }}
          <div class="h-[1px] w-2 bg-current" />
        </div>

        <div class="mb-5 flex flex-none items-center gap-x-2">
          <div class="h-10 w-10 rounded-full bg-white" />
          <div class="flex flex-col justify-center px-2">
            <div>{{ post.user.name }}</div>
            <div class="flex gap-x-3">
              <div class="flex items-center gap-x-1">
                <IconFillHeart class="h-4 w-4" /> {{ post.user.countFollower }}
              </div>
              <div class="flex items-center gap-x-1">
                <IconPost class="h-4 w-4" /> {{ post.user.countPost }}
              </div>
            </div>
          </div>
        </div>
      </template>
      <div>
        <div>
          작성일: {{ $format.date(post.createAt, 'yyyy년MM월dd일HH시mm분') }}
        </div>
        <div>
          마지막 수정일:
          {{ $format.date(post.updateAt, 'yyyy년MM월dd일HH시mm분') }}
        </div>
      </div>
      <div class="pt-10">
        <div class="pb-2 text-3xl font-extrabold">{{ post.title }}</div>
        <InputEditor :model-value="post.contents" readonly />
      </div>
      <PostComments class="pt-2" :post-id="id" />
    </LayoutInner>
  </template>
</template>
