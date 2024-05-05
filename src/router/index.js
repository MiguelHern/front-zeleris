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
          path: '/TeachersHome',
          name: 'TeachersHome',
          component:()=>import('@/views/Teachers/TeachersHome.vue')
        },
        {
          path: '/TeachersHome/GenerarPermiso',
          name: 'TeachersHome/GenerarPermiso',
          component:()=>import('@/views/Teachers/GenerarPermiso.vue')
        },
        {
          path: '/AdminHome',
          name: 'AdminHome',
          component:()=>import('@/views/CordinacionAdministrativa/AdminHome.vue')
        },
        {
          path: '/Policies',
          name: 'Policies',
          component:()=>import('@/views/Layout/Policies.vue')
        },


      ]
    },
  ]
})

export default router
