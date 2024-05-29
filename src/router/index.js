import {createRouter, createWebHistory} from 'vue-router'

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
                    path: '/Cordination/Profile',
                    name: 'Cordination/Profile',
                    component: () => import('@/views/Cordinacion/ProfileCordination.vue'),
                },
                {
                    path: '/Cordination/HistorialPermisos',
                    name: 'History',
                    component: () => import('@/views/Cordinacion/CordinatorHistory.vue'),
                },
                {
                    path: '/Cordination/RequestPermit',
                    name: 'RequestPermit',
                    component: () => import('@/views/Cordinacion/RequestPermit.vue')
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
                {
                    path: '/Admin/Dependencies',
                    name: 'Admin/Dependencies',
                    component: () => import('@/views/CordinacionAdministrativa/Dependencies.vue')
                },
                {
                    path: '/Admin/Profile',
                    name: 'Admin/Profile',
                    redirect: { name: 'SettingsA' },
                    component: () => import('@/views/CordinacionAdministrativa/Profile.vue'),
                    children: [
                        {
                            path: 'settingsA',
                            name: 'SettingsA',
                            component: () => import('@/views/CordinacionAdministrativa/Settings.vue')
                        },
                        {
                            path: 'historialA',
                            name: 'HistorialA',
                            component: () => import('@/views/CordinacionAdministrativa/Historial.vue')
                        },
                        {
                            path: 'permisoA',
                            name: 'PermisoA',
                            component: () => import('@/views/CordinacionAdministrativa/RequestPermit.vue')
                        }
                    ]
                }

            ]
        },
        {
            path: '/PanelDirector',
            name: 'PanelDirector',
            redirect: '/PanelDirector',
            component: () => import('../views/Principal/LayoutPanelPrincipal.vue'),
            children: [
                //Rutas Coordinación administrativa
                {
                    path: '/PrincipalHome',
                    name: 'PrincipalHome',
                    component: () => import('@/views/Principal/PrincipalHome.vue')
                },
                {
                    path: '/Principal/Policies',
                    name: 'Principal/Policies',
                    component: () => import('@/views/Principal/PoliciesPrincipal.vue')
                },
                {
                    path: '/Principal/History',
                    name: 'Principal/History',
                    component: () => import('@/views/Principal/TeachersHistory.vue')
                },
                {
                    path: '/Principal/History/Docentes',
                    name: 'Principal/History/Docentes',
                    component: () => import('@/views/Principal/DocentesPermisos.vue')
                },
                {
                    path: '/Principal/Dependencies',
                    name: 'Principal/Dependencies',
                    component: () => import('@/views/Principal/Dependencies.vue')
                },
                {
                    path: '/Principal/Profile',
                    name: 'Profile',
                    redirect: { name: 'Settings' },
                    component: () => import('@/views/Principal/Profile.vue'),
                    children: [
                        {
                            path: 'settings',
                            name: 'Settings',
                            component: () => import('@/views/Principal/Settings.vue')
                        },
                        {
                            path: 'historial',
                            name: 'Historial',
                            component: () => import('@/views/Principal/Historial.vue')
                        },
                        {
                            path: 'permiso',
                            name: 'Permiso',
                            component: () => import('@/views/Principal/RequestPermit.vue')
                        }
                    ]
                }

            ]
        },
    ]
})

// Middleware de navegación para verificar la existencia del token antes de cada navegación
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');

    if (to.path === '/ForgotPassword' && from.path !== '/') {
        // Solo permitir acceso a ForgotPassword si viene desde Login
        next('/');
    } else if (!isAuthenticated && to.path !== '/' && to.path !== '/ForgotPassword' && to.path !== '/ChangePassword' && to.path !== '/EnterCode') {
        // Redirige al login si no está autenticado y la ruta no es una de las permitidas sin autenticación
        next('/');
    } else {
        next(); // Continúa con la navegación
    }
});

export default router
