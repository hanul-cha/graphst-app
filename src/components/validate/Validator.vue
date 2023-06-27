<script setup lang="ts">
export interface ValidationEvents {
  (_: 'submit'): void
  (_: 'error'): void
}

const emit = defineEmits<ValidationEvents>()

const { handleSubmit } = useForm()

const onSubmit = handleSubmit(() => {
  emit('submit')
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <slot />
  </form>
</template>
