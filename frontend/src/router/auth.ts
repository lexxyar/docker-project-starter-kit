import { type RouteRecordRaw } from "vue-router";

const authRoutes: RouteRecordRaw[] = [
    {
        path: '/register',
        name: 'register',
        component: () => import('../pages/auth/RegisterPage.vue'),
        meta: {
            layout: 'AuthorizingLayout',
            guest: true,
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/auth/LoginPage.vue'),
        meta: {
            layout: 'AuthorizingLayout',
            guest: true,
        }
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: () => import('../pages/auth/ForgotPassword.vue'),
        meta: {
            layout: 'AuthorizingLayout',
        }
    },
    {
        path: '/reset-password',
        name: 'reset-password',
        component: () => import('../pages/auth/ResetPassword.vue'),
        meta: {
            layout: 'AuthorizingLayout',
        }
    },
    {
        path: '/email-verification',
        name: 'email-verification',
        component: () => import('../pages/auth/EmailVerification.vue'),
        meta: {
            layout: 'EmptyLayout',
            requiresAuth: true,
        }
    },
]
export default authRoutes
