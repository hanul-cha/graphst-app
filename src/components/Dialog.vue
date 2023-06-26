<script setup lang="ts">
interface DialogProps {
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
}

interface DialogEmits {
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'close'): void
}

withDefaults(defineProps<DialogProps>(), {
  title: '',
  message: '',
  confirmText: '확인',
  cancelText: undefined,
})

defineEmits<DialogEmits>()

const $dialog = ref<HTMLDialogElement | null>(null)

onMounted(() => {
  $dialog.value?.showModal()
})
</script>

<template>
  <dialog
    ref="$dialog"
    class="flex flex-col items-center justify-center rounded-xl border-none bg-white p-8"
    @close.prevent="$emit('close')"
    @cancel.prevent="$emit('cancel')"
  >
    <div>{{ title }}</div>
    <div>{{ message }}</div>
    <div class="flex w-full justify-end">
      <button v-if="cancelText" @click="$emit('cancel')">
        {{ cancelText }}
      </button>
      <button @click="$emit('confirm')">{{ confirmText }}</button>
    </div>
  </dialog>
</template>
