<script setup lang="ts">
import { useGlobalActiveStore } from '@/store/globalActive'

export interface InputSelectOption {
  label: string
  value: any
}

interface InputSelectProps {
  modelValue?: any
  placeholder?: string
  error?: boolean
  disabled?: boolean
  options?: InputSelectOption[]
  keyName?: string
  isUpList?: boolean
}

interface InputSelectEmits {
  (_e: 'update:modelValue', _value: any): void
  (_e: 'open'): void
  (_e: 'close'): void
}

const props = withDefaults(defineProps<InputSelectProps>(), {
  modelValue: null,
  placeholder: undefined,
  error: false,
  disabled: false,
  options: () => [],
  keyName: undefined,
  isUpList: false,
})

const emit = defineEmits<InputSelectEmits>()

const { active, close } = useGlobalActiveStore()

const $inputSelect = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const selectedLabel = computed(() => getSelectedLabel(props.modelValue))

function getSelectedLabel(value: string | null) {
  if (!value) null
  return props.options?.find((option) => option.value === value)?.label ?? null
}

async function open(e: FocusEvent) {
  if (!$inputSelect.value || props.disabled) return
  isOpen.value = true
  emit('open')

  await close(props.keyName ?? 'input-select')
  await active({
    key: props.keyName ?? 'input-select',
    target: $inputSelect.value,
    callback: () => {
      isOpen.value = false
      const target = e.target as HTMLInputElement
      target?.blur()
      emit('close')
    },
  })
}

async function select(option: InputSelectOption) {
  emit('update:modelValue', option.value)
  await close(props.keyName ?? 'input-select')
  emit('close')
}
</script>

<template>
  <div ref="$inputSelect" class="relative">
    <input
      :value="selectedLabel"
      class="w-full rounded-xl border p-2 pl-3 text-sm focus:select-none focus:caret-transparent focus:outline-none"
      :class="{
        'border-red-500': error,
        'rounded-b-none': isOpen && !props.isUpList,
        'rounded-t-none': isOpen && props.isUpList,
      }"
      :placeholder="placeholder"
      :disabled="disabled"
      @paste.prevent
      @keydown.prevent
      @focus="open"
    />
    <div
      class="absolute right-2 top-0 flex h-full items-center"
      :class="{
        '-rotate-90': isUpList,
        'rotate-90': !isUpList,
      }"
    >
      <IconRight
        class="fill-gray-300 transition-transform duration-300"
        :class="{
          'rotate-180 fill-gray-800': isOpen,
        }"
      />
    </div>
    <div
      v-show="isOpen"
      class="absolute z-[1] max-h-40 w-full overflow-y-auto border bg-white text-sm"
      :class="{
        'bottom-0 translate-y-full rounded-b-xl border-t-0': !props.isUpList,
        'top-0 -translate-y-full rounded-t-xl border-b-0': props.isUpList,
      }"
    >
      <template v-if="options?.length > 0">
        <template v-for="(option, index) of options" :key="index">
          <slot name="item" :option="option" :select="select">
            <div
              :class="{
                'text-gray-300': modelValue === option.value,
              }"
              class="p-2 hover:bg-gray-100"
              @click="select(option)"
            >
              {{ option.label }}
            </div>
          </slot>
        </template>
      </template>
      <template v-else>
        <div class="p-2 text-gray-400">선택할 수 있는 옵션이 없습니다.</div>
      </template>
    </div>
  </div>
</template>
