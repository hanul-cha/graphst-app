<script setup lang="ts">
interface ValidateFieldProps {
  modelValue?: string | null
  name: string
  //TODO: roles
  roles?: string | string[]
}

const props = defineProps<ValidateFieldProps>()

const isRequired = (value: any) => (value ? true : 'This field is required')

const { errorMessage, value } = useField(props.name, isRequired, {
  initialValue: props.modelValue,
})

watch(
  () => props.modelValue,
  (modelValue) => {
    value.value = modelValue ?? null
  }
)
</script>

<template>
  <div>
    <slot :="{ errorMessage }" />
    <div class="block text-xs text-red-500">
      {{ errorMessage }}
    </div>
  </div>
</template>
