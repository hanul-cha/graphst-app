<script setup lang="ts">
import { useGlobalActiveStore } from '@/store/globalActive'

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

const { active, close } = useGlobalActiveStore()

const inputOrder = useVModel(props, 'order', emit)
const inputAsc = useVModel(props, 'asc', emit)

const isOpen = ref(false)
const $sort = ref<HTMLElement | null>(null)

async function toggle() {
  if (isOpen.value) {
    await close('sort-history')
    return
  }
  if (!$sort.value) return
  isOpen.value = true
  emit('open')
  active({
    key: 'sort-history',
    target: $sort.value,
    callback: () => {
      isOpen.value = false
      emit('close')
    },
  })
}

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
  <div ref="$sort" class="relative">
    <div @click="toggle">
      <IconSort
        class="cursor-pointer stroke-gray-500 transition-transform duration-300"
        :class="{
          'stroke-orange-500': inputOrder,
        }"
      />
    </div>
    <div
      v-if="isOpen"
      class="absolute bottom-0 left-0 z-10 min-w-[128px] max-w-xl translate-y-full"
    >
      <InputSelect
        v-model="inputOrder"
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
    </div>
  </div>
</template>
