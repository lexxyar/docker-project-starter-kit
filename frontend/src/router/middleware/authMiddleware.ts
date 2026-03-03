import type { NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router'
import { useAuthStore } from "@/stores/auth.ts"

// @ts-ignore
export async function authMiddleware(to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) {
    const auth = useAuthStore()

    if (!auth.isLoggedIn) {
        await auth.fetchUser()
    }

    if (to.meta.requiresAuth && !auth.isLoggedIn) next({
        name: 'login', query: {
            ref: to.fullPath,
        }
    })
    else if (to.meta.guest && auth.isLoggedIn) next({ name: 'dashboard' })
    else next()
}
