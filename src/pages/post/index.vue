<script setup lang="ts">
import { GetCategoryAllDocument, PostPaginationDocument } from '@/api/graphql'
import { useAuthStore } from '@/store/auth'
import { useFilterStore } from '@/store/filter'
import { useGlobalActiveStore } from '@/store/globalActive'

const useFilter = useFilterStore()
const auth = useAuthStore()
const { close } = useGlobalActiveStore()
const perPage = useRouteQuery<string>('perPage')
const page = useRouteQuery<string>('page')

const filter = useFilter.on({
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
})

const { result } = useQuery(GetCategoryAllDocument)
const { result: pagination } = useQuery(PostPaginationDocument, () => ({
  perPage: perPage.value ? Number(perPage.value) : undefined,
  page: page.value ? Number(page.value) : undefined,
  likeUserId: filter.myLike.value ? auth.user?.id : undefined,
  userId: filter.my.value ? auth.user?.id : undefined,
  categoryId: filter.category.value,
  query: filter.query.value,
}))

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

const testOption = [
  {
    label: '!!',
    value: '??',
  },
]

function getLabel(id: string) {
  return result.value?.categories.find((category) => category.id === id)?.label
}
</script>

<template>
  <LayoutInner>
    <template #header>
      <div v-if="useFilter.filter" class="z-10 pb-4">
        <FilterHistory
          v-model:model-value="useFilter.filter"
          @close="() => close('category-history')"
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
    </template>
    <div>
      {{ totalCount }}
      {{ posts }}
    </div>
  </LayoutInner>
</template>
