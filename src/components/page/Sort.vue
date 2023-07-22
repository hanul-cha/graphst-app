<script setup lang="ts">
interface SortProps {
  options?: {
    label: string
    value: any
  }[]
  order?: string | null
  asc?: boolean | null
  keyName?: string
}

export interface SortEmits {
  (_e: 'order', _value: string): void
  (_e: 'asc', _value: boolean | null): void
  (_e: 'open'): void
  (_e: 'close'): void
}

const props = withDefaults(defineProps<SortProps>(), {
  options: () => [],
  order: null,
  asc: null,
  keyName: 'input-sort',
})

const emit = defineEmits<SortEmits>()

const inputOrder = useVModel(props, 'order', emit)
const inputAsc = useVModel(props, 'asc', emit)

function setOrder(order: string) {
  if (inputOrder.value === order) {
    if (inputAsc.value === null) {
      inputAsc.value = true
    } else if (inputAsc.value === true) {
      inputAsc.value = false
    } else if (inputAsc.value === false) {
      inputAsc.value = null
      inputOrder.value = null
    }
    return
  }
  inputOrder.value = order
  inputAsc.value = true
}
</script>

<template>
  <div>
    <InputSelect
      v-model="inputOrder"
      class="w-32"
      :options="options"
      :key-name="keyName"
      placeholder="정렬없음"
      @open="$emit('open')"
      @close="$emit('close')"
    >
      <template #item="{ option: { value, label } }">
        <div
          :class="{
            'text-gray-300': inputOrder === value,
          }"
          class="p-2 hover:bg-gray-100"
          @click="setOrder(value)"
        >
          {{ label }}
        </div>
      </template>
    </InputSelect>
  </div>
</template>
