<script setup lang="ts">
interface InputPasswordProps {
  modelValue?: string | null
  placeholder?: string
  error?: boolean
  disabled?: boolean
}

interface InputPasswordEmits {
  (_e: 'update:modelValue', _value: string | null): void
}

const props = withDefaults(defineProps<InputPasswordProps>(), {
  modelValue: null,
  placeholder: undefined,
  error: false,
  disabled: false,
})

const emit = defineEmits<InputPasswordEmits>()

const inputValue = useVModel(props, 'modelValue', emit)
const isPassword = ref(true)
</script>

<template>
  <div class="relative flex w-full items-center">
    <input
      v-model="inputValue"
      class="w-full rounded-xl border p-2 pl-3 pr-8 text-sm focus:outline-none"
      :class="{
        'border-red-500': error,
      }"
      :placeholder="placeholder"
      :type="isPassword ? 'password' : 'text'"
      :disabled="disabled"
    />
    <div class="-ml-8">
      <template v-if="isPassword">
        <IconCloseEye class="fill-gray-300" @click="isPassword = false" />
      </template>
      <template v-else>
        <IconOpenEye class="fill-gray-300" @click="isPassword = true" />
      </template>
    </div>
  </div>
</template>
