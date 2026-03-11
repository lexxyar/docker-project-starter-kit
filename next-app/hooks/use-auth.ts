import apiClient from "@/lib/api-client"
import Cookies from 'js-cookie'

type TCredentials = {
    email: string
    password: string
}
type TPasswordResetCredentials = {
    token: string
    email: string
    password: string
    password_confirmation: string
}

type TCurrentUserResponse = {
    id: string
    name: string
    email: string
}

type TAuthResponse = {
    user: TCurrentUserResponse
    token: string
}

type TSocialProvider = 'yandex' | 'google'

export function useAuth() {
    const http = apiClient()

    const setToken = (token?: string): void => {
        if (token !== undefined) {
            Cookies.set('authToken', token, {expires: 1, secure: true, sameSite: 'Strict'})

        } else {
            Cookies.remove('authToken')
        }
    }
    const getToken = () => Cookies.get('authToken') ?? null

    const login = async (credentials: TCredentials) => {

        try {
            const response = await http.post<TAuthResponse>('/login', credentials)
            setToken(response.token)
            // await fetchUser()
            return response
        } finally {

        }
    }

    const register = async (credentials: TCredentials) => {

        try {
            const response = await http.post<TAuthResponse>('/register', credentials)
            setToken(response.token)
            // await fetchUser()
            return response
        } finally {

        }
    }

    const logout = async () => {

        try {
            await http.post('/logout')
            setToken(undefined)
            window.location.href = '/'
        } finally {

        }
    }

    const fetchUser = async () => {
        if (!getToken()) return null

        try {
            return await http.get<TCurrentUserResponse>('/profile')
        } catch {
            setToken(undefined)
        }
        return null
    }

    const socialRedirect = async (provider: TSocialProvider) => {
        const resp = await http.get<{ url: string }>(`/auth/${provider}/redirect`)
        window.location.href = resp.url
    }

    const socialLogin = async (provider: string | TSocialProvider, queryParams: URLSearchParams) => {
        try {
            const response =
                await http.get<TAuthResponse>(`/auth/${provider}/callback?${queryParams.toString()}`)
            setToken(response.token)
            // await fetchUser()
            return response
        } finally {

        }
    }

    const emailResetPasswordLink = async (email: string) => {
        await http.post('/forgot-password', {email})
    }

    const resetPassword = async (credentials: TPasswordResetCredentials) => {
        await http.post('/reset-password', credentials)
    }

    return {
        login,
        register,
        fetchUser,
        logout,
        socialRedirect,
        socialLogin,
        emailResetPasswordLink,
        resetPassword,
    }
}