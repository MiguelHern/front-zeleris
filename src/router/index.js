import { createRouter, createWebHistory } from 'vue-router'

function existToken() {
  return !!localStorage.token;
}

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
      component: () => import('../views/EnterCode.vue'),
      meta: {
        requiresVerification: true // Indicador de que esta ruta requiere verificación
      }
    },
    {
      path: '/PanelTeacher',
      name: 'PanelTeacher',
      redirect: '/Panel',
      component: () => import('../views/Layout/LayoutPanel.vue'),
      children: [
        //Rutas Teacher
        {
          path: '/TeachersHome',
          name: 'TeachersHome',
          component: () => import('@/views/Teachers/TeachersHome.vue')
        },
        {
          path: '/TeachersHome/GenerarPermiso',
          name: 'TeachersHome/GenerarPermiso',
          component: () => import('@/views/Teachers/GenerarPermiso.vue')
        },
        {
          path: '/TeachersHome/Settings',
          name: 'TeachersHome/Settings',
          component: () => import('@/views/Teachers/SettingsTeacher.vue')
        },
        {
          path: '/Teacher/Policies',
          name: 'Teacher/Policies',
          component: () => import('@/views/Teachers/PoliciesTeacher.vue')
        },
        {
          path: '/Teacher/History',
          name: 'Teacher/History',
          component: () => import('@/views/Teachers/HistoryPermit.vue')
        },
        //Rutas coordinación
        {
          path: '/CordinationHome/',
          name: 'CordinationHome',
          component: () => import('@/views/Cordinacion/CordinationHome.vue')
        },

      ]
    },
    {
      path: '/PanelCordination',
      name: 'PanelCordination',
      redirect: '/PanelCordination',
      component: () => import('../views/Cordinacion/LayoutPanelCordination.vue'),
      children: [
        //Rutas coordinación
        {
          path: '/CordinationHome',
          name: 'CordinationHome',
          component: () => import('@/views/Cordinacion/CordinationHome.vue')
        },
        {
          path: '/Cordination/Polices',
          name: 'Cordination/Polices',
          component: () => import('@/views/Cordinacion/Policies.vue')
        },
      ]
    },
    {
      path: '/PanelAdmin',
      name: 'PanelAdmin',
      redirect: '/PanelAdmin',
      component: () => import('../views/CordinacionAdministrativa/LayoutPanelAdmin.vue'),
      children: [
        //Rutas Coordinación administrativa
        {
          path: '/AdminHome',
          name: 'AdminHome',
          component: () => import('@/views/CordinacionAdministrativa/AdminHome.vue')
        },
        {
          path: '/Admin/Policies',
          name: 'Admin/Policies',
          component: () => import('@/views/CordinacionAdministrativa/Policies.vue')
        },
        {
          path: '/Admin/History',
          name: 'Admin/History',
          component: () => import('@/views/CordinacionAdministrativa/TeachersHistory.vue')
        },
        {
          path: '/Admin/History/Docentes',
          name: 'Admin/History/Docentes',
          component: () => import('@/views/CordinacionAdministrativa/DocentesPermisos.vue')
        },
      ]
    },
  ]
})

// Middleware de navegación para verificar la existencia del token antes de cada navegación
router.beforeEach((to, from, next) => {
  if (to.path !== '/' && !existToken()) {
    // Si el usuario intenta acceder a una ruta diferente a / y no hay un token en el almacenamiento local, redirige al inicio de sesión
    next('/');
  } else {
    next(); // Continúa con la navegación
  }
});

export default router
