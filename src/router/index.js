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
      path: '/ChangePassword',
      name: 'ChangePassword',
      component: () => import('../views/ChangePassword.vue')
    },
    {
      path: '/EnterCode',
      name: 'EnterCode',
      component: () => import('../views/EnterCode.vue')
    },
    {
      path: '/Panel',
      name: 'Panel',
      redirect:'/Panel',
      component: () => import('../views/Layout/LayoutPanel.vue'),
      children:[
          //Rutas Teacher
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
          path: '/TeachersHome/Settings',
          name: 'TeachersHome/Settings',
          component:()=>import('@/views/Teachers/SettingsTeacher.vue')
        },
        {
          path: '/Teacher/Policies',
          name: 'Teacher/Policies',
          component:()=>import('@/views/Teachers/PoliciesTeacher.vue')
        },
        {
          path: '/Teacher/History',
          name: 'Teacher/History',
          component:()=>import('@/views/Teachers/HistoryPermit.vue')
        },
          //Rutas Coordinación administrativa
        {
          path: '/AdminHome',
          name: 'AdminHome',
          component:()=>import('@/views/CordinacionAdministrativa/AdminHome.vue')
        },
        {
          path: '/Admin/Policies',
          name: 'Admin/Policies',
          component:()=>import('@/views/CordinacionAdministrativa/Policies.vue')
        },
        {
          path: '/Admin/History',
          name: 'Admin/History',
          component:()=>import('@/views/CordinacionAdministrativa/TeachersHistory.vue')
        },

          //Rutas coordinación
        {
          path: '/CordinationHome/',
          name: 'CordinationHome',
          component:()=>import('@/views/Cordinacion/CordinationHome.vue')
        },

      ]
    },
  ]
})

export default router
