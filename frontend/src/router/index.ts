import {createRouter, createWebHistory, type Router, type RouteRecordRaw} from 'vue-router'
import {layoutMiddleware} from "@/router/middleware/layoutMiddleware.ts"
import authRoutes from '@/router/auth';
import {authMiddleware} from "@/router/middleware/authMiddleware.ts"
import settingRoutes from "@/router/settings.ts"

type TLayout = 'AuthorizingLayout' | 'GuestLayout' | 'AuthenticatedLayout' | 'EmptyLayout'

declare module 'vue-router' {
    interface RouteMeta {
        layout?: TLayout;
        requiresAuth?: boolean;
        guest?: boolean;
    }
}

const routes: RouteRecordRaw[] = [
    {path: '/', component: () => import('../pages/HomePage.vue'),},
    {
        path: '/dashboard', component: () => import('../pages/DashboardPage.vue'),
        name: 'dashboard',
        meta: {
            layout: 'AuthenticatedLayout',
            requiresAuth: true,
        }
    },
    ...authRoutes,
    ...settingRoutes,
]

const router: Router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(authMiddleware)
router.beforeEach(layoutMiddleware)

export {router}