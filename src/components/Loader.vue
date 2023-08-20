<script setup lang="ts">
let observer: IntersectionObserver | null = null

export interface LoaderProps {
  event: (
    continueLoad: () => Promise<void>,
    endLoad: () => void
  ) => Promise<void>
}

const props = defineProps<LoaderProps>()

const loader = ref<HTMLElement | null>(null)
const off = ref(false)

onMounted(async () => {
  await setObserver()
})

onUnmounted(() => {
  disconnect()
})

async function setObserver() {
  off.value = false
  await nextTick()
  observer = new IntersectionObserver(callback, { threshold: [1] })
  if (loader.value) observer.observe(loader.value)
}

const callback = useDebounceFn((entries: IntersectionObserverEntry[]) => {
  if (off.value) return
  entries.forEach(async (entry) => {
    if (entry.isIntersecting) {
      disconnect()
      await props.event(continueLoad, endLoad)
    }
  })
}, 1000)

async function continueLoad() {
  await setObserver()
}

function disconnect() {
  if (observer) {
    observer.disconnect()
    observer = null
  }
}

function endLoad() {
  off.value = true
  disconnect()
}
</script>

<template>
  <div v-if="!off" ref="loader">
    <slot>
      <div>로딩중...</div>
    </slot>
  </div>
</template>
