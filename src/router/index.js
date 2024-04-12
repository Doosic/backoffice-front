import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from "@/layout/AppLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/pages/Login.vue')
    }
  ]
})

export default router;