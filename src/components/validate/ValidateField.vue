<script setup lang="ts">
interface ValidateFieldProps {
  modelValue?: string | null
  name: string
  //TODO: roles
  roles?: string | string[]
  //TODO: input 디자인은 slot같은거 안뚫어주고 일원화 시킬것임
  variant?: string
}

interface ValidateFieldEmits {
  (_e: 'update:modelValue', _value: string | null): void
}

const emit = defineEmits<ValidateFieldEmits>()

const props = defineProps<ValidateFieldProps>()

const isRequired = (value: any) => (value ? true : 'This field is required')

const { errorMessage, value } = useField(props.name, isRequired, {
  initialValue: props.modelValue,
})

watch(value, (value) => {
  emit('update:modelValue', value)
})
</script>

<template>
  <div>
    <input
      v-model="value"
      placeholder="id"
      :error="errorMessage"
      class="w-full rounded-2xl border p-2 focus:outline-none"
      type="text"
    />
    <div class="block text-xs text-red-500">
      {{ errorMessage }}
    </div>
  </div>
</template>
