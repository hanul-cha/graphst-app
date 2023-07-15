<script setup lang="ts">
type FilterHistoryValue =
  | string
  | number
  | boolean
  | (string | number | boolean)[]
  | null
export interface FilterHistoryItem {
  label: string
  value: FilterHistoryValue
}

interface FilterHistoryProps {
  items?: {
    [key: string]: FilterHistoryItem
  }
}

interface FilterHistoryEmits {
  (_e: 'delete', _value: string): void
  (
    _e: 'update',
    _value: {
      key: string
      value: FilterHistoryValue
    }
  ): void
}

const props = withDefaults(defineProps<FilterHistoryProps>(), {
  items: undefined,
})
const emit = defineEmits<FilterHistoryEmits>()

const histories = computed(() => {
  return props.items
    ? Object.entries(props.items).map(([key, value]) => ({
        ...value,
        key,
      }))
    : []
})

function deleteHistory(key: string) {
  emit('delete', key)
}

function updateHistory(key: string, value: FilterHistoryValue) {
  emit('update', {
    key,
    value,
  })
}
</script>

<template>
  <div class="w-full">
    {{ histories }}
    <div class="flex w-full gap-x-1">
      <template v-for="(data, index) of histories" :key="index">
        <div v-if="data.value" class="flex justify-between">
          <div>
            <span class="text-sm text-gray-700">{{ data.label }}: </span>
            <span class="text-sm text-gray-500">{{
              Array.isArray(data.value) ? data.value.join(', ') : data.value
            }}</span>
          </div>
          <IconPlus class="rotate-45" />
        </div>
      </template>
    </div>
  </div>
</template>
