import {defineStore} from 'pinia';
import {useHttp} from "@/services/api.ts"
import type {TUser} from "@/types"
import {computed, ref} from "vue"

const {http} = useHttp()
export const useAuthStore = defineStore('auth', () => {
    const user = ref<TUser | null>(null)
    const token = ref<string | null>(localStorage.getItem('token') || null)

    const isLoggedIn = computed(() => !!user.value && !!token.value)

    const setUser = (responseBody: any) => {
        user.value = responseBody.user ?? null
        token.value = responseBody.token ?? null

        if (token.value) {
            localStorage.setItem('token', token.value)
        } else {
            localStorage.removeItem('token')
        }
    }

    const fetchUser = async () => {
        if (!token.value) {
            user.value = null
            return;
        }

        try {
            const res = await http.get('/profile')

            if (res.status > 299) throw new Error()

            user.value = res.data
        } catch {
            user.value = null
            token.value = null
            localStorage.removeItem('token')
        }
    }

    const logout = async () => {
        if (!token.value) return;

        await http.post('/logout')

        user.value = null
        token.value = null
        localStorage.removeItem('token')
    }

    return {logout, fetchUser, setUser, isLoggedIn, user}
})