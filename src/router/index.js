import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/ForgotPassword',
      name: 'ForgotPassword',
      component: () => import('../views/ForgotPassword.vue')
    },
    {
      path: '/Panel',
      name: 'Panel',
      redirect:'/Panel',
      component: () => import('../views/Layout/LayoutPanel.vue'),
      children:[
        {
          path: '/HomeTeachers',
          name: 'HomeTeachers',
          component:()=>import('@/views/Teachers/HomeTeachers.vue')
        },
        {
          path: '/HomeTeachers/GenerarPermiso',
          name: 'HomeTeachers/GenerarPermiso',
          component:()=>import('@/views/Teachers/GenerarPermiso.vue')
        },

      ]
    },
  ]
})

export default router
