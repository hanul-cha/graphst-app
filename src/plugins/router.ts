/* eslint-disable import/no-unresolved */
import type { Plugin } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import { useGlobalActiveStore } from '@/store/globalActive'

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes, { path: '/:pathMatch(.*)*', redirect: '/' }],
})

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    const { closeAll } = useGlobalActiveStore()
    closeAll()
  }
  next()
})

export default {
  install(app) {
    app.use(router)
  },
} as Plugin
