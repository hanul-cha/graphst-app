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
    class="rounded-xl bg-origin p-2 text-white"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
