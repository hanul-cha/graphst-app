<script setup lang="ts">
const tooltip = ref<HTMLElement | null>(null)
const isHovered = ref(false)

interface TooltipEmits {
  (_e: 'enter', _value: MouseEvent): void
  (_e: 'leave', _value: MouseEvent): void
}

defineEmits<TooltipEmits>()
</script>

<template>
  <div
    class="relative"
    @mouseleave="
      ($event) => {
        isHovered = false
        $emit('leave', $event)
      }
    "
  >
    <div
      class="inline-block"
      @mouseenter="
        ($event) => {
          isHovered = true
          $emit('enter', $event)
        }
      "
    >
      <slot />
    </div>
    <div
      v-if="isHovered"
      ref="tooltip"
      class="absolute left-0 top-0 z-20 -translate-y-full"
    >
      <slot name="tooltip" />
    </div>
  </div>
</template>
