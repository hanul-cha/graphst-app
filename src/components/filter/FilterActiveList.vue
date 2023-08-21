<script setup lang="ts">
import { FilterHistoryValue } from '@/plugins/filter'
import { FilterHistoryEmits, FilterHistoryProps } from './types'

const props = defineProps<FilterHistoryProps>()
const emit = defineEmits<FilterHistoryEmits>()

const histories = computed(() => {
  return props.modelValue
    ? Object.entries(props.modelValue)
        .map(([key, value]) => ({
          ...value,
          key,
        }))
        .filter(({ ignore }) => !ignore)
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
  <div v-if="histories.length > 0" ref="$plus" class="relative">
    <div class="flex gap-x-1">
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
              <slot :name="`value-${data.key}`" :value="data.value">
                {{
                  Array.isArray(data.value) ? data.value.join(', ') : data.value
                }}
              </slot>
            </div>
          </div>
          <IconCross
            class="w-3 cursor-pointer fill-gray-500"
            @click="updateHistory(data.key, null)"
          />
        </div>
      </template>
    </div>
  </div>
</template>
