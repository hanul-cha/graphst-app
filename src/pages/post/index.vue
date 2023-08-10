<script setup lang="ts">
import {
  GetCategoryAllDocument,
  PostPaginationDocument,
  PostInPageFragment,
  PostOrder,
} from '@/api/graphql'
import { useAuthStore } from '@/store/auth'
import { useFilter } from '@/plugins/filter'
import { useGlobalActiveStore } from '@/store/globalActive'

const { on, filter } = useFilter()
const auth = useAuthStore()
const { close } = useGlobalActiveStore()
const windowSize = useWindowSize()

const { my, myLike, query, category, page, perPage, asc, order } = on({
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
})

const { result } = useQuery(GetCategoryAllDocument)
const {
  result: pagination,
  loading,
  refetch,
} = useQuery(PostPaginationDocument, () => ({
  perPage: perPage.value ? perPage.value : undefined,
  page: page.value ? page.value : undefined,
  likeUserId: myLike.value ? auth.user?.id ?? '0' : undefined,
  userId: my.value ? auth.user?.id ?? '0' : undefined,
  categoryId: category.value,
  query: query.value,
  order: order.value as PostOrder | null,
  asc: asc.value,
}))

const perPageOption = ref(8)

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
    value: '_NULL_',
  },
  {
    label: '필터 적용 안함',
    value: null,
  },
])

onMounted(() => {
  setPaginationOption(windowSize.width.value)
})
watch(windowSize.width, (width) => setPaginationOption(width))

const sortOption = [
  {
    label: '제목',
    value: PostOrder.Title,
  },
  {
    label: '좋아요',
    value: PostOrder.Follower,
  },
  {
    label: '댓글',
    value: PostOrder.Comment,
  },
]

const setPaginationOption = useDebounceFn((width: number) => {
  if (width >= 1280) {
    perPage.value = 20
    perPageOption.value = 10
    page.value = 1
  } else if (width >= 1024) {
    perPage.value = 16
    perPageOption.value = 8
    page.value = 1
  } else if (width >= 768) {
    perPage.value = 18
    perPageOption.value = 9
    page.value = 1
  } else {
    perPage.value = 10
    perPageOption.value = 10
    page.value = 1
  }
}, 500)

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
}

function getLabel(id: string) {
  if (id === '_NULL_') return '카테고리 없음'
  return result.value?.categories.find((category) => category.id === id)?.label
}
</script>

<template>
  <LayoutInner>
    <template #header>
      <div class="pb-4 text-2xl font-bold">모든 포스팅</div>
      <div v-if="filter" class="z-10 pb-4">
        <FilterHistory
          v-model:model-value="filter"
          @close="() => close('category-history')"
          @update:model-value="resetPage"
        >
          <template #value-category="{ value }">
            {{ getLabel(value as string) }}
          </template>
          <template #active-category="{ activeItem, updateHistory }">
            <div class="flex gap-x-1">
              <InputSelect
                v-model:model-value="activeItem.value"
                key-name="category-history"
                :options="categoryOptions"
                @update:model-value="
                  updateHistory(activeItem.key, activeItem.value)
                "
              />
            </div>
          </template>
        </FilterHistory>
      </div>

      <div class="mt-6 flex items-center justify-between pb-2">
        <div class="text-sm">
          Total Count: <span class="text-current">{{ totalCount }}</span>
        </div>
        <div>
          <InputSort
            v-model:asc="asc"
            v-model:order="order"
            :options="sortOption"
          />
        </div>
      </div>
    </template>
    <div>
      <template v-if="!loading && posts.length === 0">
        <div class="flex h-full w-full items-center justify-center">
          포스팅이 없습니다.
        </div>
      </template>
      <template v-else>
        <div
          class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          <template v-for="(post, index) of posts" :key="index">
            <PostCard
              :post="post"
              @update="
                ($event) => {
                  order === PostOrder.Follower ? refetch() : updatePost($event)
                }
              "
            />
          </template>
        </div>
      </template>
    </div>
    <template #bottom>
      <Pagination
        v-model:page="page"
        v-model:perPage="perPage"
        :per-page-option="perPageOption"
        :total="totalCount"
        @update:per-page="resetPage"
      />
    </template>
  </LayoutInner>
</template>
