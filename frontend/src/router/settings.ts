import type { RouteRecordRaw } from "vue-router";

const settingRoutes: RouteRecordRaw[] = [
    {
        path: '/settings',
        component: () => import('../pages/profile/Index.vue'),
        redirect: '/settings/profile',
        meta: {
            layout: 'AuthenticatedLayout',
            requiresAuth: true,
        },
        children: [
            {
                path: 'profile',
                component: () => import('../pages/profile/ProfilePage.vue'),
            },
            {
                path: 'password',
                component: () => import('../pages/profile/PasswordPage.vue'),
            },
        ],
    },
]

export default settingRoutes
