<script setup lang="ts">
import { FilterHistoryValue } from '@/plugins/filter'
import { useGlobalActiveStore } from '@/store/globalActive'

export interface FilterHistoryItem {
  label: string
  value: any
  type?: StringConstructor | NumberConstructor | BooleanConstructor
  isMultiple?: boolean
  ignore?: boolean
}

interface FilterHistoryProps {
  modelValue: {
    [key: string]: FilterHistoryItem
  }
}

export interface UpdateFilter {
  key: string
  value: FilterHistoryValue
}

interface FilterHistoryEmits {
  (
    _e: 'update:modelValue',
    _value: {
      [key: string]: FilterHistoryItem
    }
  ): void
  (_e: 'open'): void
  (_e: 'close'): void
}

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
    emit('close')
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
  <div v-if="histories.length > 0" ref="$plus" class="relative">
    <div class="flex w-5/6 items-center justify-start gap-x-4">
      <div class="flex gap-x-1">
        <template v-for="(data, index) of histories" :key="index">
          <div
            v-if="data.value"
            class="flex items-center justify-between gap-x-2 rounded-full border bg-white p-2"
          >
            <div class="flex">
              <div class="pr-1 text-sm font-semibold text-gray-700">
                {{ data.label }}:
              </div>
              <div class="text-sm text-gray-700">
                <slot :name="`value-${data.key}`" :value="data.value">
                  {{
                    Array.isArray(data.value)
                      ? data.value.join(', ')
                      : data.value
                  }}
                </slot>
              </div>
            </div>
            <IconCross
              class="w-3 cursor-pointer fill-gray-500"
              @click="updateHistory(data.key, null)"
            />
          </div>
        </template>
      </div>

      <div @click="toggle">
        <IconCross
          class="cursor-pointer fill-gray-500 transition-transform duration-300"
          :class="{
            'rotate-45': !isOpen,
          }"
        />
      </div>
    </div>
    <div
      v-if="isOpen"
      class="absolute bottom-0 left-0 mt-1 flex translate-y-full pt-2"
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
                  <BasicButton class="text-sm" type="submit">
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
