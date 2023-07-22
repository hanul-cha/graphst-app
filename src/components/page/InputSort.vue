<script setup lang="ts">
interface InputSortProps {
  options?: {
    label: string
    value: any
  }[]
  order?: string | null
  asc?: boolean | null
  keyName?: string
}

export interface InputSortEmits {
  (_e: 'update:order', _value: string): void
  (_e: 'update:asc', _value: boolean | null): void
  (_e: 'open'): void
  (_e: 'close'): void
}

const props = withDefaults(defineProps<InputSortProps>(), {
  options: () => [],
  order: null,
  asc: null,
  keyName: 'input-sort',
})

const emit = defineEmits<InputSortEmits>()

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
  <InputSelect
    v-model="inputOrder"
    class="min-w-[128px]"
    :options="options"
    :key-name="keyName"
    placeholder="정렬"
    @open="$emit('open')"
    @close="$emit('close')"
  >
    <template #item="{ option: { value, label } }">
      <div
        :class="{
          'bg-current text-white': inputOrder === value,
          'hover:bg-gray-100': inputOrder !== value,
        }"
        class="relative flex items-center justify-between p-2"
        @click="setOrder(value)"
      >
        <div>{{ label }}</div>
        <div
          v-if="inputOrder === value"
          class="text-xs"
          :style="{
            'font-size': '0.5rem',
            'line-height': '0.5rem',
          }"
        >
          {{ inputAsc ? 'ASC' : 'DESC' }}
        </div>
      </div>
    </template>
  </InputSelect>
</template>
