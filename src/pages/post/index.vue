<script setup lang="ts">
import { GetCategoryAllDocument } from '@/api/graphql'
import { useFilterStore } from '@/store/filter'

const useFilter = useFilterStore()
const { result } = useQuery(GetCategoryAllDocument)

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

function getLabel(id: string) {
  return result.value?.categories.find((category) => category.id === id)?.label
}
</script>

<template>
  <LayoutInner>
    <template #header>
      <div v-if="useFilter.filter" class="pb-4">
        <FilterHistory v-model:model-value="useFilter.filter">
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
    <div class="h-[2000px]">asdfsdf</div></LayoutInner
  >
</template>
