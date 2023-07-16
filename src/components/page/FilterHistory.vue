<script setup lang="ts">
import { FilterHistoryValue } from '@/store/filter'

export interface FilterHistoryItem {
  label: string
  value: FilterHistoryValue
  type?: StringConstructor | NumberConstructor | BooleanConstructor
  isMultiple?: boolean
}

interface FilterHistoryProps {
  modelValue: {
    [key: string]: FilterHistoryItem
  }
}

export interface UpdateFilter {
  key: string
  value: FilterHistoryValue
}

interface FilterHistoryEmits {
  (
    _e: 'update:modelValue',
    _value: {
      [key: string]: FilterHistoryItem
    }
  ): void
}

const props = defineProps<FilterHistoryProps>()
const emit = defineEmits<FilterHistoryEmits>()

const histories = computed(() => {
  return props.modelValue
    ? Object.entries(props.modelValue).map(([key, value]) => ({
        ...value,
        key,
      }))
    : []
})

function updateHistory(key: string, value: FilterHistoryValue) {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: {
      ...(props.modelValue?.[key] ?? {}),
      value,
    },
  })
}
</script>

<template>
  <div class="w-full">
    <div class="flex w-full gap-x-1">
      <template v-for="(data, index) of histories" :key="index">
        <div
          v-if="data.value"
          class="flex items-center justify-between gap-x-2 rounded-full border bg-white p-2"
        >
          <div class="flex">
            <div class="pr-1 text-sm font-semibold text-gray-700">
              {{ data.label }}:
            </div>
            <div class="text-sm text-gray-700">
              {{
                Array.isArray(data.value) ? data.value.join(', ') : data.value
              }}
            </div>
          </div>
          <IconCross
            class="w-3 fill-gray-500"
            @click="updateHistory(data.key, null)"
          />
        </div>
      </template>
    </div>
  </div>
</template>
@/store/filter
