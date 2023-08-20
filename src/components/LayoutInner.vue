<script setup lang="ts">
export interface LayoutInnerProps {
  scroll?: number
}
interface LayoutInnerEmits {
  (_e: 'update:scroll', _value: number): void
}

const props = withDefaults(defineProps<LayoutInnerProps>(), {
  scroll: 0,
})
const emit = defineEmits<LayoutInnerEmits>()

const body = ref<HTMLElement | null>(null)

watch(
  () => props.scroll,
  (value) => {
    if (body.value) {
      body.value.scrollTop = value
    }
  }
)

function onScroll(e: Event) {
  const target = e.target as HTMLElement
  emit('update:scroll', target.scrollTop)
}
</script>

<template>
  <div class="flex h-full w-full flex-col p-4">
    <slot name="header" />
    <div
      ref="body"
      class="h-full w-full flex-1 overflow-auto rounded-xl bg-white p-4"
      @scroll="onScroll"
    >
      <slot />
    </div>
    <slot name="bottom" />
  </div>
</template>
