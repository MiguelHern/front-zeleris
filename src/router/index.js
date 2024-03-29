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
  ]
})

export default router
