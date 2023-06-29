import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

interface ActiveProps {
  target: HTMLElement
  callback: () => void | Promise<void>
}

export const useGlobalActiveStore = defineStore('globalActive', () => {
  const activeItem = ref<ActiveProps | null>(null)

  watch(
    activeItem,
    (item) => {
      if (item) {
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
    if (!activeItem.value) return
    const target = e.target as HTMLElement
    if (!activeItem.value.target?.contains(target)) {
      await activeItem.value.callback()
      activeItem.value = null
    }
  }

  async function clickEsc(e: KeyboardEvent) {
    if (!activeItem.value) return
    if (e.key === 'Escape') {
      await activeItem.value.callback()
      activeItem.value = null
    }
  }

  async function active(activeProps: ActiveProps) {
    if (activeItem.value) {
      await activeItem.value.callback()
    }
    activeItem.value = activeProps
  }

  return {
    active,
  }
})
