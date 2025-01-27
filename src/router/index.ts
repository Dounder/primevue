import { AUTH_ROUTES } from '@/modules/auth/routes'
import { HOME_ROUTES } from '@/modules/home/routes'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [HOME_ROUTES, AUTH_ROUTES]
})

export default router
