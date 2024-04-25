import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'IniciarSesion',
      component: () => import('../views/login.vue')
    },
    {
      path: '/recover__password.vue',
      name: 'RecoverPassword',
      component: () => import('../views/recover__password.vue')
    },
    {
      path: '/Panel',
      name: 'Panel',
      redirect:'/HomeCordinacion',
      component: () => import('../views/Layout/layout_panel.vue'),
      children:[
        {
          path: '/HomeCordinacion',
          name: 'HomeCordinacion',
          component:()=>import('../views/cordinacion/home_cordinacion.vue')
        },
      ]
    },
  ]
})

export default router
