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
    () => activeItems.value?.length,
    (length) => {
      if (length && length > 0) {
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
    if (!activeItems.value || isOpenDialog()) return
    const target = e.target as HTMLElement
    const lastItem = activeItems.value.at(-1)
    if (!lastItem?.target?.contains(target)) {
      await close()
    }
  }

  async function clickEsc(e: KeyboardEvent) {
    if (!activeItems.value || isOpenDialog()) return
    if (e.key === 'Escape') {
      await close()
    }
  }

  function isOpenDialog() {
    return document.activeElement?.tagName === 'DIALOG'
  }

  async function active(activeProps: ActiveProps) {
    activeItems.value = [...(activeItems.value || []), activeProps]
  }

  async function closeKey(key: string) {
    await Promise.all(
      activeItems.value
        ?.filter((item) => item.key === key)
        .forEach((item) => item.callback()) ?? []
    )
    activeItems.value =
      activeItems.value?.filter((item) => item.key !== key) || null
  }

  async function close(key?: string) {
    if (key) {
      await closeKey(key)
    } else {
      const lastItem = activeItems.value?.at(-1)
      if (lastItem) {
        await lastItem.callback()
        activeItems.value?.pop()
      }
    }
  }

  async function closeAll() {
    await Promise.all(
      activeItems.value?.forEach((item) => item.callback()) ?? []
    )
    activeItems.value = null
  }

  return {
    active,
    close,
    closeAll,
  }
})
