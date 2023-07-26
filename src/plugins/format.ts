import formatDate from '@/utils/formatDate'
import { InjectionKey, Plugin, inject } from 'vue'

interface Format {
  date: typeof formatDate
}

function create(): Format {
  return {
    date: formatDate,
  }
}

export const DialogKey: InjectionKey<() => Format> = Symbol('format')

export function useFormat(): Format {
  return inject(DialogKey, create)()
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $format: Format
  }
}

export default {
  install(app) {
    let format: Format | null = null
    Object.defineProperty(app.config.globalProperties, '$format', {
      get: () => format ?? (format = create()),
    })
    app.provide(DialogKey, () => app.config.globalProperties.$format)
  },
} as Plugin
