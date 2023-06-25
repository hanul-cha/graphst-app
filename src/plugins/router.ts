/* eslint-disable import/no-unresolved */
import type { Plugin } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes, { path: '/:pathMatch(.*)*', redirect: '/' }],
})

export default {
  install(app) {
    app.use(router)
  },
} as Plugin
