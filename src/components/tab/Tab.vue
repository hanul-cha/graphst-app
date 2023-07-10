<script setup lang="ts">
export interface TabOption {
  value: string
  label: string
}

export interface TabProps {
  tabs: TabOption[]
  modelValue: string
}

export interface TabEmits {
  (_: 'update:modelValue', __: string): void
}

const props = withDefaults(defineProps<TabProps>(), {
  tabs: () => [],
})

defineEmits<TabEmits>()

const $tab = ref<HTMLElement[]>([])
const position = ref<{
  left: number
  width: number
}>({
  left: 0,
  width: 0,
})

onMounted(() => {
  update(props.modelValue)
})

watch(
  () => props.modelValue,
  (value) => {
    update(value)
  },
  { immediate: true }
)

function update(value: string) {
  nextTick(() => {
    $tab.value.forEach((tab) => {
      if (tab.dataset.value === value) {
        position.value = {
          left: tab.offsetLeft,
          width: tab.offsetWidth,
        }
      }
    })
  })
}
</script>

<template>
  <div class="relative flex w-full">
    <div
      class="absolute bottom-0 h-1 bg-current transition-all duration-300 ease-in-out"
      :style="{
        left: position.left + 'px',
        width: position.width + 'px',
      }"
    />
    <template v-for="(item, index) in tabs" :key="index">
      <div
        ref="$tab"
        class="w-full cursor-pointer py-2 text-center text-sm"
        :class="{
          'text-gray-500': item.value !== modelValue,
          'font-bold text-gray-900': item.value === modelValue,
        }"
        :data-value="item.value"
        @click="$emit('update:modelValue', item.value)"
      >
        {{ item.label }}
      </div>
    </template>
  </div>
</template>
