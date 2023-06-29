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
  (_e: 'update:modelValue', _value: string | null): void
}

const props = withDefaults(defineProps<InputSelectProps>(), {
  modelValue: null,
  placeholder: undefined,
  error: false,
  disabled: false,
  options: () => [],
})

const emit = defineEmits<InputSelectEmits>()

const { active, close } = useGlobalActiveStore()

const $inputSelect = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const selectedLabel = ref<string | null>(getSelectedLabel(props.modelValue))

function getSelectedLabel(value: string | null) {
  if (!value) null
  return props.options?.find((option) => option.value === value)?.label ?? null
}

function open(e: FocusEvent) {
  if (!$inputSelect.value || props.disabled) return
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

function select(option: InputSelectOption) {
  selectedLabel.value = option.label
  emit('update:modelValue', option.value)
  close()
}
</script>

<template>
  <div ref="$inputSelect" class="relative">
    <input
      :value="selectedLabel"
      class="w-full rounded-2xl border p-2 focus:select-none focus:caret-transparent focus:outline-none"
      :class="{
        'border-red-500': error,
        'rounded-b-none': isOpen,
      }"
      :placeholder="placeholder"
      :disabled="disabled"
      @paste.prevent
      @keydown.prevent
      @focus="open"
    />
    <div
      v-if="isOpen"
      class="absolute bottom-0 z-10 w-full translate-y-full rounded-b-2xl border border-t-0 bg-white"
    >
      <template v-if="options?.length > 0">
        <template v-for="(option, index) of options" :key="index">
          <div class="p-2 hover:bg-gray-100" @click="select(option)">
            {{ option.label }}
          </div>
        </template>
      </template>
      <template v-else>
        <div class="p-2 text-gray-400">선택할 수 있는 옵션이 없습니다.</div>
      </template>
    </div>
  </div>
</template>
