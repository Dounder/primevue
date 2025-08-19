import type { RouteRecordRaw } from 'vue-router'

export const HOME_ROUTES: RouteRecordRaw = {
  path: '/',
  alias: '/home',
  name: 'home',
  component: () => import('./pages/HomePage.vue'),
}
