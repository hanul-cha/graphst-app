<script setup lang="ts">
import { useGlobalActiveStore } from '@/store/globalActive'

interface DialogEmits {
  (_: 'cancel'): void
  (_: 'close'): void
}

defineEmits<DialogEmits>()

const { active } = useGlobalActiveStore()

const $dialog = ref<HTMLDialogElement | null>(null)
const $item = ref<HTMLElement | null>(null)

onMounted(async () => {
  $dialog.value?.show()

  await nextTick()

  if ($item.value) {
    await active({
      key: 'dialog',
      target: $item.value,
      callback: () => {
        $dialog.value?.close()
      },
    })
  }
})
</script>

<template>
  <dialog
    ref="$dialog"
    class="z-30 h-full w-full border-none bg-black/30 outline-0"
    @close.prevent="$emit('close')"
    @cancel.prevent="$emit('cancel')"
  >
    <div ref="$item" class="rounded-xl bg-white p-4">
      <slot />
    </div>
  </dialog>
</template>
