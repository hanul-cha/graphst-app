import { computed, Plugin, ref, InjectionKey, inject, ComputedRef } from 'vue'

export interface DialogOptions {
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dialog: Dialog
  }
}

export interface Dialog {
  open(_options: DialogOptions): Promise<boolean>
  close(_confirmed?: boolean | null): void
  option: ComputedRef<DialogOptions | undefined>
  opened: ComputedRef<boolean>
}

export const DialogKey: InjectionKey<() => Dialog> = Symbol('dialog')

export function useDialog(): Dialog {
  return inject(DialogKey, create)()
}

function create(): Dialog {
  const opened = ref(false)
  const options = ref<DialogOptions | undefined>(undefined)
  let resolve: ((_confirmed: boolean) => void) | undefined

  function open(opts: DialogOptions): Promise<boolean> {
    opened.value = true
    options.value = opts
    return new Promise((r) => (resolve = r))
  }

  function close(confirmed: boolean | null = null) {
    opened.value = false
    resolve?.(confirmed === true)
  }

  return {
    open,
    close,
    option: computed(() => options.value),
    opened: computed(() => opened.value),
  }
}

export default {
  install(app) {
    let dialog: Dialog | null = null
    Object.defineProperty(app.config.globalProperties, '$dialog', {
      get: () => dialog ?? (dialog = create()),
    })
    app.provide(DialogKey, () => app.config.globalProperties.$dialog)
  },
} as Plugin
