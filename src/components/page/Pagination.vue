<script setup lang="ts">
export interface PaginationProps {
  perPage?: number | null
  page?: number | null
  total?: number | null
}

export interface PaginationEmits {
  (_e: 'update:page', _value: number): void
  (_e: 'update:perPage', _value: number): void
}

const props = withDefaults(defineProps<PaginationProps>(), {
  perPage: 10,
  page: 1,
  total: 0,
})
const emit = defineEmits<PaginationEmits>()

const pageCount = computed(() =>
  Math.ceil((props.total ?? 0) / (props.perPage ?? 10))
)

const pages = computed(() => {
  return Array.from({ length: pageCount.value }, (_, i) => i + 1)
})

const left = computed(() => {
  const baseWidth = 32
  return baseWidth * 2 - ((props.page ?? 1) - 1) * baseWidth
})

function updatePage(value: number) {
  emit('update:page', value)
}
</script>

<template>
  <div class="mx-auto mt-4 rounded-xl bg-white p-2">
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
  </div>
</template>
