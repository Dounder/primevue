import { HOME_ROUTES } from '@/modules/home'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    HOME_ROUTES,
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      redirect: { name: 'home' },
    },
  ],
})

export default router
