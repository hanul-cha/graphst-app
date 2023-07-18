import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

interface ActiveProps {
  key?: string
  target: HTMLElement
  callback: () => void | Promise<void>
}

export const useGlobalActiveStore = defineStore('globalActive', () => {
  const activeItems = ref<ActiveProps[] | null>(null)

  watch(
    activeItems,
    (item) => {
      if (item && item.length > 0) {
        document.addEventListener('click', unActive)
        document.addEventListener('keydown', clickEsc)
      } else {
        document.removeEventListener('click', unActive)
        document.removeEventListener('keydown', clickEsc)
      }
    },
    { immediate: true }
  )

  async function unActive(e: MouseEvent) {
    if (!activeItems.value) return
    const target = e.target as HTMLElement
    const lastItem = activeItems.value.at(-1)
    if (!lastItem?.target?.contains(target)) {
      await close()
    }
  }

  async function clickEsc(e: KeyboardEvent) {
    if (!activeItems.value) return
    if (e.key === 'Escape') {
      await close()
    }
  }

  async function active(activeProps: ActiveProps) {
    if (activeProps.key) {
      await Promise.all(
        activeItems.value
          ?.filter((item) => item.key === activeProps.key)
          .forEach((item) => item.callback()) ?? []
      )
      activeItems.value =
        activeItems.value?.filter((item) => item.key !== activeProps.key) ||
        null
    }
    activeItems.value = [...(activeItems.value || []), activeProps]
  }

  async function close() {
    const lastItem = activeItems.value?.at(-1)
    if (lastItem) {
      await lastItem.callback()
      activeItems.value?.pop()
    }
  }

  return {
    active,
    close,
  }
})
