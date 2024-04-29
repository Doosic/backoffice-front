import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from "@/layout/AppLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/pages/Login.vue')
    },
    {
      path: '/',
      redirect: '/login',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'dashborad',
          component: () => import('@/views/DashBoard.vue')
        },
        {
          path: '/admin/list',
          name: 'adminList',
          component: () => import('@/views/admin/AdminList.vue')
        },
        {
          path: '/auth/list',
          name: 'authList',
          component: () => import('@/views/auth/AuthList.vue')
        }
      ]
    },
  ]
})

export default router;