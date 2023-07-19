<script setup lang="ts">
interface DialogEmits {
  (_: 'cancel'): void
  (_: 'close'): void
}

defineEmits<DialogEmits>()

const $dialog = ref<HTMLDialogElement | null>(null)

onMounted(() => {
  $dialog.value?.showModal()
})
</script>

<template>
  <dialog
    ref="$dialog"
    class="rounded-xl border-none bg-white p-6 outline-0"
    @close.prevent="$emit('close')"
    @cancel.prevent="$emit('cancel')"
  >
    <slot />
  </dialog>
</template>
