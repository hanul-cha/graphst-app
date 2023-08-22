<script setup lang="ts">
import { PostInPageFragment, ToggleLikePostDocument } from '@/api/graphql'
import { useAuthStore } from '@/store/auth'

export interface PostCardProps {
  post: PostInPageFragment
}

interface PostCardEmits {
  (_e: 'update', _value: PostInPageFragment): void
}

const props = defineProps<PostCardProps>()
const emit = defineEmits<PostCardEmits>()

const auth = useAuthStore()
const dialog = useDialog()
const router = useRouter()

const { mutate, loading } = useMutation(ToggleLikePostDocument)

const isItemHover = ref(false)
const isImgHover = ref(false)

async function toggleLike(like: boolean) {
  if (loading.value) return
  if (!auth.user) {
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
  const data = await mutate({
    targetId: props.post.id,
    like,
  })
  if (!data?.data?.result) {
    await dialog.open({
      title: '알수없는 에러',
      message: '같은 현상이 발생하면 1대1 문의를 이용해주세요.',
      confirmText: '확인',
    })
    return
  }
  emit('update', {
    ...props.post,
    isLike: like,
    countLike: props.post.countLike + (like ? 1 : -1),
  })
}

function pushPostPath() {
  if (props.post.activeAt || auth.user?.id === props.post.user.id) {
    router.push(`/post/${props.post.id}`)
    return
  }
}
</script>

<template>
  <div class="relative cursor-pointer" @click="pushPostPath">
    <div
      v-if="!post.activeAt"
      class="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center text-2xl font-bold"
    >
      비공개
    </div>
    <div @mouseenter="isItemHover = true" @mouseleave="isItemHover = false">
      <div
        class="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-gray-50 transition-all"
        :class="{
          '-translate-y-2 shadow-lg': isItemHover,
        }"
        @mouseenter="isImgHover = true"
        @mouseleave="isImgHover = false"
      >
        <template v-if="false">
          <!-- TODO -->
          <!-- <img
          class="h-full w-full rounded-lg object-cover"
          :src="imgUrl"
          :alt="alt"
        /> -->
        </template>
        <template v-else>
          <IconImg class="h-28 w-28 stroke-gray-300" />
        </template>
        <div v-if="isImgHover" class="absolute bottom-0 right-0 flex pr-1">
          <div
            class="flex cursor-pointer items-center p-2"
            @click.prevent.stop="toggleLike(!post.isLike)"
          >
            <template v-if="post.isLike">
              <IconFillHeart class="h-5 w-5 fill-red-500" />
            </template>
            <template v-else>
              <IconLineHeart class="h-5 w-5 fill-gray-500" />
            </template>
            <div class="text-gray-500">{{ post.countLike }}</div>
          </div>
          <div class="flex items-center gap-x-1 p-2">
            <IconComment class="h-4 w-4" />
            <div class="text-gray-500">{{ post.countComment }}</div>
          </div>
        </div>
      </div>
      <div
        class="p-2"
        :class="{
          'opacity-10': !post.activeAt,
        }"
      >
        <div class="text-sm">
          {{ post.category?.label ?? '카테고리 없음' }} ·
          {{ $format.date(post.createAt) }}
        </div>
        <div
          class="truncate pb-1 pt-3 text-3xl font-semibold"
          :class="{
            'text-blue-500': isItemHover,
          }"
        >
          {{ post.title }}
        </div>
        <!-- TODO: contexts 길이가 긴경우 사이드 바 길이가 없어지는 버그 수정 -->
        <!-- <div class="overflow-hidden pr-1">
          <div class="truncate pb-3">
            {{ $format.removeHtmlTag(post.contents) }}
          </div>
        </div> -->

        <UserTooltip
          :id="post.user.id"
          :name="post.user.name"
          :disabled="!post.activeAt"
        />
      </div>
    </div>
  </div>
</template>
