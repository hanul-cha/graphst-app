import { Plugin } from 'vue'
import { useAuthStore } from '@/store/auth'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $auth: ReturnType<typeof useAuthStore>
  }
}

export default {
  install(app) {
    app.config.globalProperties.$auth = useAuthStore()
  },
} as Plugin
