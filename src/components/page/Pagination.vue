<script setup lang="ts">
export interface PaginationProps {
  perPage?: number | null
  perPageOption?: number
  page?: number | null
  total?: number | null
  type?: 'page-button' | 'next-button'
}

export interface PaginationEmits {
  (_e: 'update:page', _value: number): void
  (_e: 'update:perPage', _value: number): void
}

const props = withDefaults(defineProps<PaginationProps>(), {
  perPage: 10,
  perPageOption: 10,
  page: 1,
  total: 0,
  type: 'page-button',
})
const emit = defineEmits<PaginationEmits>()

const pageCount = computed(() =>
  Math.ceil((props.total ?? 0) / (props.perPage ?? 10))
)

const pages = computed(() => {
  if (pageCount.value === 0) {
    return [1]
  }
  return Array.from({ length: pageCount.value }, (_, i) => i + 1)
})

const left = computed(() => {
  const baseWidth = 32
  return baseWidth * 2 - ((props.page ?? 1) - 1) * baseWidth
})

const pageSelectOption = computed(() => {
  return pages.value.map((page) => ({
    label: page.toString(),
    value: page,
  }))
})

const perPageSelectOption = computed(() =>
  [1, 2, 3, 4, 5].map((num) => {
    const perPage = (props.perPageOption ?? 10) * num
    return {
      label: perPage.toString(),
      value: perPage,
    }
  })
)

const hasPrev = computed(() => (props.page ?? 1) > 1)
const hasNext = computed(() => (props.page ?? 1) < pageCount.value)

function updatePage(value: number) {
  emit('update:page', value)
}
</script>

<template>
  <div class="mx-auto mt-4 flex items-center rounded-xl bg-white p-2">
    <InputSelect
      v-if="props.type === 'page-button'"
      class="w-16"
      :options="perPageSelectOption"
      :model-value="props.perPage"
      is-up-list
      @update:model-value="emit('update:perPage', $event)"
    />
    <div v-else class="flex">
      <IconDoubleRight
        class="h-5 w-5 rotate-180 cursor-pointer"
        :class="{
          'fill-gray-300': !hasPrev,
          'fill-black': hasPrev,
        }"
        @click="
          () => {
            if (hasPrev && props.page) {
              emit('update:page', 1)
            }
          }
        "
      />
      <IconRight
        class="rotate-180 cursor-pointer"
        :class="{
          'fill-gray-300': !hasPrev,
        }"
        @click="
          () => {
            if (hasPrev && props.page) {
              emit('update:page', props.page - 1)
            }
          }
        "
      />
    </div>
    <div class="relative h-8 w-[160px] overflow-hidden">
      <div class="absolute left-16 top-0 h-8 w-8 rounded-xl bg-current" />
      <div
        class="absolute top-0 flex transition-all duration-300"
        :style="{
          left: left + 'px',
        }"
      >
        <template v-for="page of pages" :key="page">
          <div
            class="flex h-8 w-8 cursor-pointer items-center justify-center"
            @click="updatePage(page)"
          >
            <div
              class="transition-all duration-300"
              :class="{
                'text-lg font-bold text-white': page === props.page,
                'text-gray-400': page !== props.page,
                'text-sm':
                  page === (props.page ?? 1) - 1 ||
                  page === (props.page ?? 1) + 1,
                'text-xs':
                  page === (props.page ?? 1) - 2 ||
                  page === (props.page ?? 1) + 2,
              }"
            >
              {{ page }}
            </div>
          </div>
        </template>
      </div>
    </div>
    <InputSelect
      v-if="props.type === 'page-button'"
      class="w-16"
      :options="pageSelectOption"
      :model-value="props.page"
      is-up-list
      @update:model-value="emit('update:page', $event)"
    />
    <div v-else class="flex">
      <IconRight
        class="cursor-pointer"
        :class="{
          'fill-gray-300': !hasNext,
        }"
        @click="
          () => {
            if (hasNext && props.page) {
              emit('update:page', props.page + 1)
            }
          }
        "
      />
      <IconDoubleRight
        class="h-5 w-5 cursor-pointer"
        :class="{
          'fill-gray-300': !hasNext,
          'fill-black': hasNext,
        }"
        @click="
          () => {
            if (hasNext && props.page) {
              emit('update:page', pageCount)
            }
          }
        "
      />
    </div>
  </div>
</template>
