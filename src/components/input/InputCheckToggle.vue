<script setup lang="ts">
interface InputCheckToggleProps {
  modelValue?: boolean
  error?: boolean
  disabled?: boolean
}

interface InputCheckToggleEmits {
  (_e: 'update:modelValue', _value: boolean): void
}

withDefaults(defineProps<InputCheckToggleProps>(), {
  modelValue: false,
  placeholder: undefined,
  error: false,
  disabled: false,
})

defineEmits<InputCheckToggleEmits>()
</script>

<template>
  <div
    class="relative h-9 w-[72px] rounded-full border"
    :class="{
      'border-red-500': error,
      'justify-end': modelValue,
      'justify-start': !modelValue,
    }"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <div
      class="absolute top-0 aspect-square h-full rounded-full p-1 transition-all duration-200"
      :class="{
        'left-full -translate-x-full': modelValue,
        'left-0': !modelValue,
      }"
    >
      <div
        class="h-full w-full rounded-full transition-all duration-200"
        :class="{
          'bg-current': modelValue,
          'bg-gray-300': !modelValue,
        }"
      />
    </div>
  </div>
</template>
