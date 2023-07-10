<script setup lang="ts">
interface DialogProps {
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
}

interface DialogEmits {
  (_: 'confirm'): void
  (_: 'cancel'): void
  (_: 'close'): void
}

withDefaults(defineProps<DialogProps>(), {
  title: '',
  message: '',
  confirmText: '확인',
  cancelText: undefined,
})

defineEmits<DialogEmits>()
</script>

<template>
  <Dialog
    class="flex flex-col items-center justify-center"
    @close="$emit('close')"
    @cancel="$emit('cancel')"
  >
    <div class="text-lg font-bold">{{ title }}</div>
    <div>{{ message }}</div>
    <div class="flex w-full justify-end">
      <button v-if="cancelText" @click="$emit('cancel')">
        {{ cancelText }}
      </button>
      <button @click="$emit('confirm')">{{ confirmText }}</button>
    </div>
  </Dialog>
</template>
