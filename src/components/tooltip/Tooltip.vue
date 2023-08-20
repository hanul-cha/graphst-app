<script setup lang="ts">
export interface TooltipProps {
  disabled?: boolean
}

const props = defineProps<TooltipProps>()

interface TooltipEmits {
  (_e: 'enter', _value: MouseEvent): void
  (_e: 'leave', _value: MouseEvent): void
}

const emit = defineEmits<TooltipEmits>()

const tooltip = ref<HTMLElement | null>(null)
const isHovered = ref(false)

function onMouseEvent(hover: boolean, e: MouseEvent) {
  if (props.disabled) return
  isHovered.value = hover
  if (hover) {
    emit('enter', e)
  } else {
    emit('leave', e)
  }
}
</script>

<template>
  <div class="relative" @mouseleave="($event) => onMouseEvent(false, $event)">
    <div
      class="inline-block"
      :class="{
        'cursor-pointer': !props.disabled,
      }"
      @mouseenter="($event) => onMouseEvent(true, $event)"
    >
      <slot />
    </div>
    <div
      v-if="isHovered && !props.disabled"
      ref="tooltip"
      class="absolute left-0 top-0 z-20 -translate-y-full rounded-xl bg-white shadow-md"
    >
      <slot name="tooltip" />
    </div>
  </div>
</template>
