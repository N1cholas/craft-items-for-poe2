import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

export enum ROUTE_PATH {
  DEFAULT = '/',
  HOME = '/home',
  WORKBENCH = '/workbench',
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTE_PATH.DEFAULT,
      name: 'home',
      component: HomeView,
    },
    {
      path: ROUTE_PATH.HOME,
      name: 'home',
      component: HomeView,
    },
    {
      path: ROUTE_PATH.WORKBENCH,
      name: 'workbench',
      component: () => import('../views/WorkbenchView.vue'),
    },
  ],
})

export default router
