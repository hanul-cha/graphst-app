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
import { apolloClient } from '@/plugins/apollo'

const { on, filter } = useFilter()
const auth = useAuthStore()
const { close } = useGlobalActiveStore()

const requireLoad = ref(false)
const page = ref<number>(1)
const scrollTop = ref<number>(0)
const { my, myLike, query, category, asc, order } = on({
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

const variablesParameter = computed(() => ({
  perPage: 10,
  page: 1,
  likeUserId: myLike.value ? auth.user?.id ?? '0' : undefined,
  userId: my.value ? auth.user?.id ?? '0' : undefined,
  categoryId: category.value,
  query: query.value,
  order: order.value as PostOrder | null,
  asc: asc.value,
}))

const { result } = useQuery(GetCategoryAllDocument)
const { loading, refetch, onResult } = useQuery(
  PostPaginationDocument,
  variablesParameter
)
onResult(({ data }) => {
  scrollTop.value = 0
  posts.value = data.posts?.nodes ?? []
  totalCount.value = data.posts?.totalCount ?? 0

  page.value = 1
  if (data.posts?.pageInfo.hasNextPage) {
    requireLoad.value = true
  }
})

const posts = ref<PostInPageFragment[]>([])
const totalCount = ref<number>(0)
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

function updatePost(post: PostInPageFragment) {
  if (!posts.value.length) return
  posts.value = posts.value.map((node) => (node.id === post.id ? post : node))
}

function getLabel(id: string) {
  if (id === '_NULL_') return '카테고리 없음'
  return result.value?.categories.find((category) => category.id === id)?.label
}

async function loadEvent(
  continueLoad: () => Promise<void>,
  endLoad: () => void
) {
  if (loading.value) {
    continueLoad()
    return
  }
  page.value += 1
  const { data } = await apolloClient.query({
    query: PostPaginationDocument,
    variables: {
      ...variablesParameter.value,
      page: page.value,
    },
  })
  if (posts.value.length && data.posts?.nodes && data.posts?.nodes.length) {
    posts.value.push(...data.posts.nodes)
  }
  if (data.posts?.pageInfo.hasNextPage) {
    await continueLoad()
  } else {
    endLoad()
    requireLoad.value = false
  }
}
</script>

<template>
  <LayoutInner v-model:scroll="scrollTop">
    <template #header>
      <div class="pb-4 text-center text-2xl font-bold">모든 포스팅</div>
      <FilterActiveList
        v-if="filter"
        v-model:model-value="filter"
        @close="() => close('category-history')"
      />

      <div class="mt-6 flex items-center justify-between pb-2">
        <div class="flex gap-x-2">
          <FilterActiveButton
            v-if="filter"
            v-model:model-value="filter"
            @close="() => close('category-history')"
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
          </FilterActiveButton>
          <InputSort
            v-model:asc="asc"
            v-model:order="order"
            :options="sortOption"
          />
        </div>
        <div class="text-sm">
          Total Count: <span class="text-current">{{ totalCount }}</span>
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
        <div class="space-y-8 px-14">
          <template v-for="(post, index) of posts" :key="`${index}_${post.id}`">
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
        <Loader v-if="requireLoad" :event="loadEvent" />
      </template>
    </div>
  </LayoutInner>
</template>
