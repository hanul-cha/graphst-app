<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'
import { ValidateProps, validator } from './validator'

interface ValidateFieldProps {
  modelValue?: string | null
  name: string
  roles?: ValidateProps
  validateOnSubmit?: boolean
}

interface ValidateFieldEmits {
  (_: 'update:modelValue', _value: string | null): void
}

const props = defineProps<ValidateFieldProps>()
const emit = defineEmits<ValidateFieldEmits>()

const rules = (value: any, field: any) => {
  if (props.roles) {
    return validator(value, field, props.roles)
  }
  return true
}
</script>

<template>
  <Field
    v-slot="slotOption"
    :model-value="modelValue"
    :name="name"
    :rules="rules"
    :validate-on-input="!validateOnSubmit"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div>
      <slot
        :="{
          ...slotOption,
          field: { ...slotOption.field, modelValue: slotOption.field.value },
        }"
      />

      <slot
        v-if="slotOption.errorMessage"
        name="error"
        :error-message="slotOption.errorMessage"
      >
        <ErrorMessage :name="props.name" class="block text-xs text-red-500" />
      </slot>
    </div>
  </Field>
</template>
