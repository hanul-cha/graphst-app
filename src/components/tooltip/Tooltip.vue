<script setup lang="ts">
const tooltip = ref<HTMLElement | null>(null)
const isHovered = ref(false)

export interface CardProps {
  imgUrl?: string
}

interface TooltipEmits {
  (_e: 'enter', _value: MouseEvent): void
  (_e: 'leave', _value: MouseEvent): void
}

defineEmits<TooltipEmits>()

watch(
  () => tooltip.value,
  (value) => {
    if (value) {
      console.log(value.getBoundingClientRect().height)
    }
  }
)
</script>

<template>
  <div
    class="relative"
    @mouseenter="
      ($event) => {
        isHovered = true
        $emit('enter', $event)
      }
    "
    @mouseleave="
      ($event) => {
        isHovered = false
        $emit('leave', $event)
      }
    "
  >
    <slot />
    <div v-if="isHovered" ref="tooltip" class="absolute z-20">
      <slot name="tooltip" />
    </div>
  </div>
</template>
