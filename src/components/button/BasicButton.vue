<script setup lang="ts">
export interface BasicButtonProps {
  type?: 'submit' | 'button'
  disabled?: boolean
}

withDefaults(defineProps<BasicButtonProps>(), {
  type: 'button',
  disabled: false,
})
</script>

<template>
  <button
    class="mt-6 rounded-xl bg-origin py-2 text-white"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
