<script setup lang="ts">
import { HTMLAttributes } from 'vue'

interface InputTextProps {
  modelValue?: string | null
  placeholder?: string
  error?: boolean
  disabled?: boolean
  type?: HTMLAttributes['inputmode']
}

interface InputTextEmits {
  (_e: 'input:modelValue', _value: string | null): void
}

const props = withDefaults(defineProps<InputTextProps>(), {
  modelValue: null,
  placeholder: undefined,
  error: false,
  disabled: false,
  type: 'text',
})

const emit = defineEmits<InputTextEmits>()

const inputValue = useVModel(props, 'modelValue', emit)
</script>

<template>
  <input
    v-model="inputValue"
    class="w-full rounded-2xl border p-2 focus:outline-none"
    :class="{
      'border-red-500': error,
    }"
    :placeholder="placeholder"
    :type="type"
    :disabled="disabled"
  />
</template>
