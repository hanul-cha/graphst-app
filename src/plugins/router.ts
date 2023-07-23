/* eslint-disable import/no-unresolved */
import type { Plugin } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import { useGlobalActiveStore } from '@/store/globalActive'
import { useAuthStore } from '@/store/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes, { path: '/:pathMatch(.*)*', redirect: '/' }],
})

const passPath = new Set([
  '/signin',
  '/signup',
  '/signin/find-password',
  '/',
  '/post',
])

router.beforeEach(async (to, from, next) => {
  if (to.path !== from.path) {
    const { closeAll } = useGlobalActiveStore()
    closeAll()
  }

  const auth = useAuthStore()
  if (!auth.user) {
    await auth.getUser()
  }

  // TODO: post.id허용
  if (!auth.user && !passPath.has(to.path)) {
    throw new Error('로그인이 필요한 서비스 입니다.')
  }
  next()
})

export default {
  install(app) {
    app.use(router)
  },
} as Plugin
