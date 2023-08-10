<script setup lang="ts">
import { useField } from 'vee-validate'
import { ValidateProps, validator } from './validator'

interface ValidateFieldProps {
  modelValue?: any
  name: string
  roles?: ValidateProps
  validateOnSubmit?: boolean
}

const props = defineProps<ValidateFieldProps>()

const rules = (value: any, field: any) => {
  if (props.roles) {
    return validator(value, field, props.roles)
  }
  return true
}

const { errorMessage, value } = useField(props.name, rules)

watch(
  () => props.modelValue,
  (modelValue) => {
    value.value = modelValue
  }
)
</script>

<template>
  <div>
    <slot
      :="{
        errorMessage,
      }"
    />

    <slot v-if="errorMessage" name="error" :error-message="errorMessage">
      <div class="text-xs text-red-500">{{ errorMessage }}</div>
    </slot>
  </div>
</template>
