import type { RouteRecordRaw } from 'vue-router'
import { HomeLayout } from './layout'

export const HOME_ROUTES: RouteRecordRaw = {
  path: '/',
  name: 'home.layout',
  component: HomeLayout,
  children: [
    {
      path: '',
      alias: 'home',
      name: 'home.page',
      component: () => import('./pages/HomePage.vue'),
    },
  ],
}
