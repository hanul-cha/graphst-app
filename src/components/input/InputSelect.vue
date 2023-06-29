<script setup lang="ts">
import { useGlobalActiveStore } from '@/store/globalActive'

export interface InputSelectOption {
  label: string
  value: string
}

interface InputSelectProps {
  modelValue?: string | null
  placeholder?: string
  error?: boolean
  disabled?: boolean
  options?: InputSelectOption[]
}

interface InputSelectEmits {
  (_e: 'select:modelValue', _value: string | null): void
}

const props = withDefaults(defineProps<InputSelectProps>(), {
  modelValue: null,
  placeholder: undefined,
  error: false,
  disabled: false,
  options: () => [],
})

const emit = defineEmits<InputSelectEmits>()

const { active } = useGlobalActiveStore()

const selectedOption = ref<InputSelectOption | null>(
  getSelectedOption(props.modelValue)
)

const $inputSelect = ref<HTMLElement | null>(null)
const isOpen = ref(false)

function getSelectedOption(value: string | null) {
  if (!value) null
  return props.options?.find((option) => option.value === value) ?? null
}

function open(e: FocusEvent) {
  if (!$inputSelect.value) return
  isOpen.value = true
  active({
    target: $inputSelect.value,
    callback: () => {
      isOpen.value = false
      const target = e.target as HTMLInputElement
      target?.blur()
    },
  })
}
</script>

<template>
  <div ref="$inputSelect" class="relative">
    <input
      v-bind="selectedOption?.label"
      class="w-full rounded-2xl border p-2 focus:select-none focus:caret-transparent focus:outline-none"
      :class="{
        'border-red-500': error,
      }"
      :placeholder="placeholder"
      :disabled="disabled"
      @paste.prevent
      @keydown.prevent
      @focus="open"
    />
    <div
      v-if="isOpen"
      class="absolute bottom-0 z-10 h-9 w-full translate-y-full bg-black"
    />
  </div>
</template>
