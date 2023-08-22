<script setup lang="ts">
import { FilterHistoryValue } from '@/plugins/filter'
import { useGlobalActiveStore } from '@/store/globalActive'
import {
  FilterHistoryEmits,
  FilterHistoryItem,
  FilterHistoryProps,
} from './types'

const { active, close } = useGlobalActiveStore()

const props = defineProps<FilterHistoryProps>()
const emit = defineEmits<FilterHistoryEmits>()

const $plus = ref<HTMLElement | null>(null)
const isOpen = ref(false)

const activeItem = ref<
  | (FilterHistoryItem & {
      key: string
    })
  | null
>(null)

const histories = computed(() => {
  return props.modelValue
    ? Object.entries(props.modelValue)
        .map(([key, value]) => ({
          ...value,
          key,
        }))
        .filter(({ ignore }) => !ignore)
    : []
})

const isActive = computed(() => {
  return histories.value.some(({ value }) => !!value)
})

function updateHistory(key: string, value: FilterHistoryValue) {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: {
      ...(props.modelValue?.[key] ?? {}),
      value,
    },
  })
}

async function toggle() {
  if (isOpen.value) {
    await close('filter-history')
    return
  }
  if (!$plus.value) return
  isOpen.value = true
  emit('open')
  active({
    key: 'filter-history',
    target: $plus.value,
    callback: () => {
      activeItem.value = null
      isOpen.value = false
      emit('close')
    },
  })
}
</script>

<template>
  <div
    v-if="histories.length > 0"
    ref="$plus"
    class="relative flex items-center justify-center"
  >
    <div @click="toggle">
      <IconFilter
        class="cursor-pointer stroke-gray-500 transition-transform duration-300"
        :class="{
          'stroke-orange-500': isActive,
        }"
      />
    </div>
    <div
      v-if="isOpen"
      class="absolute bottom-0 left-0 z-10 min-w-[200px] max-w-xl translate-y-full"
    >
      <div class="rounded-xl border bg-white">
        <template v-for="(data, index) of histories" :key="index">
          <div
            class="cursor-pointer p-2 text-sm hover:bg-gray-100 hover:text-gray-700"
            :class="{
              'text-gray-300': data.key !== activeItem?.key,
              'font-semibold text-gray-700': data.key === activeItem?.key,
            }"
            @click="
              activeItem = {
                ...data,
              }
            "
          >
            {{ data.label }}
          </div>

          <div v-if="data.key === activeItem?.key" class="p-2">
            <slot
              :name="`active-${data.key}`"
              :update-history="updateHistory"
              :active-item="activeItem"
              :value="data.value"
            >
              <template v-if="activeItem.type === Boolean">
                <div class="flex gap-x-1">
                  <div class="flex items-center gap-x-2">
                    <InputCheckToggle
                      v-model:model-value="activeItem.value"
                      @update:model-value="
                        updateHistory(activeItem.key, activeItem.value)
                      "
                    />
                  </div>
                </div>
              </template>
              <template v-else-if="activeItem.type === Number">
                <!-- TODO -->
              </template>
              <template v-else-if="activeItem.type === String">
                <form
                  class="flex gap-x-1"
                  @submit.prevent="
                    updateHistory(activeItem.key, activeItem.value)
                  "
                >
                  <div class="flex items-center gap-x-2">
                    <InputText v-model:model-value="activeItem.value" />
                  </div>
                  <BasicButton class="flex-none text-sm" type="submit">
                    확인
                  </BasicButton>
                </form>
              </template>
            </slot>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
