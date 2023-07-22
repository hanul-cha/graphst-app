<script setup lang="ts">
import {
  GetCategoryAllDocument,
  PostPaginationDocument,
  PostInPageFragment,
  PostOrder,
} from '@/api/graphql'
import { useAuthStore } from '@/store/auth'
import { useFilterStore } from '@/store/filter'
import { useGlobalActiveStore } from '@/store/globalActive'

const useFilter = useFilterStore()
const auth = useAuthStore()
const { close } = useGlobalActiveStore()

const { my, myLike, query, category, page, perPage, asc, order } = useFilter.on(
  {
    my: {
      type: Boolean,
      label: '내 포스팅',
    },
    myLike: {
      type: Boolean,
      label: '좋아요한 포스팅',
    },
    query: {
      type: String,
      label: '검색어',
    },
    category: {
      type: String,
      label: '카테고리',
    },
    perPage: {
      type: Number,
      ignore: true,
      default: 16,
    },
    page: {
      type: Number,
      ignore: true,
      default: 1,
    },
    asc: {
      type: Boolean,
      ignore: true,
      default: false,
    },
    order: {
      type: String,
      ignore: true,
    },
  }
)

const { result } = useQuery(GetCategoryAllDocument)
const { result: pagination, loading } = useQuery(
  PostPaginationDocument,
  () => ({
    perPage: perPage.value ? perPage.value : undefined,
    page: page.value ? page.value : undefined,
    likeUserId: myLike.value ? auth.user?.id ?? '0' : undefined,
    userId: my.value ? auth.user?.id ?? '0' : undefined,
    categoryId: category.value,
    query: query.value,
    order: order.value as PostOrder | null,
    asc: asc.value,
  })
)

const posts = computed(() => pagination.value?.posts?.nodes ?? [])
const totalCount = computed(() => pagination.value?.posts?.totalCount ?? 0)

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

const sortOption = [
  {
    label: '제목',
    value: PostOrder.Title,
  },
  {
    label: '좋아요',
    value: PostOrder.Follower,
  },
]

function updatePost(post: PostInPageFragment) {
  if (!pagination.value?.posts) return
  pagination.value = {
    ...pagination.value,
    posts: {
      ...pagination.value?.posts,
      nodes:
        pagination.value?.posts?.nodes.map((node) =>
          node.id === post.id ? post : node
        ) ?? [],
    },
  }
}

function resetPage() {
  page.value = 1
  perPage.value = 16
}

function getLabel(id: string) {
  return result.value?.categories.find((category) => category.id === id)?.label
}
</script>

<template>
  <LayoutInner>
    <template #header>
      <div class="pb-4 text-2xl font-bold">모든 포스팅</div>
      <div v-if="useFilter.filter" class="z-10 pb-4">
        <FilterHistory
          v-model:model-value="useFilter.filter"
          @close="() => close('category-history')"
          @update:model-value="resetPage"
        >
          <template #value-category="{ value }">
            {{ getLabel(value as string) }}
          </template>
          <template #active-category="{ activeItem, updateHistory }">
            <div class="flex gap-x-1">
              <ValidateField
                v-slot="{ field, errorMessage }"
                v-model="activeItem.value"
                name="카테고리"
              >
                <InputSelect
                  v-bind="field"
                  key-name="category-history"
                  :error="!!errorMessage"
                  :options="categoryOptions"
                />
              </ValidateField>
              <BasicButton
                class="text-sm"
                @click="updateHistory(activeItem.key, activeItem.value)"
              >
                확인
              </BasicButton>
            </div>
          </template>
        </FilterHistory>
      </div>

      <div class="mt-6 flex justify-between pb-2">
        <div class="text-sm">
          Total Count: <span class="text-current">{{ totalCount }}</span>
        </div>
        <div>
          <Sort v-model:asc="asc" v-model:order="order" :options="sortOption" />
        </div>
      </div>
    </template>
    <div>
      <template v-if="loading">
        <div class="flex h-full w-full items-center justify-center">
          로딩중...
        </div>
      </template>
      <template v-else-if="posts.length === 0">
        <div class="flex h-full w-full items-center justify-center">
          포스팅이 없습니다.
        </div>
      </template>
      <template v-else>
        <div class="grid grid-cols-4 gap-6">
          <template v-for="(post, index) of posts" :key="index">
            <PostCard :post="post" @update="updatePost" />
          </template>
        </div>
      </template>
    </div>
    <template #bottom>
      <Pagination
        v-model:page="page"
        v-model:perPage="perPage"
        :per-page-option="8"
        :total="totalCount"
        @update:per-page="page = 1"
      />
    </template>
  </LayoutInner>
</template>
