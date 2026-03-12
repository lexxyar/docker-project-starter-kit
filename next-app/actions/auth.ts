"use client"

import {get, post} from "@/lib/http-client"
import {deleteSession, setSession} from "@/lib/session"
import {redirect} from "next/navigation"

type TSocialProvider = 'yandex' | 'google'

type TCurrentUserResponse = {
    id: string
    name: string
    email: string
}

type TAuthResponse = {
    user: TCurrentUserResponse
    token: string
}

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

export const currentUser = async () => {
    return await get<TCurrentUserResponse>('/profile')
}

export const login = async (credentials: TCredentials) => {
    const response = await post<TAuthResponse>('/login', credentials)
    await setSession(response.token)
}

export const logout = async () => {
    await post('/logout')
    await deleteSession()
    redirect('/')
}

export const register = async (credentials: TCredentials) => {
    const response = await post<TAuthResponse>('/register', credentials)
    await setSession(response.token)
}

export const emailResetPasswordLink = async (email: string) => {
    await post('/forgot-password', {email})
}

export const resetPassword = async (credentials: TPasswordResetCredentials) => {
    await post('/reset-password', credentials)
}

export const socialRedirect = async (provider: TSocialProvider) => {
    const resp = await get<{ url: string }>(`/auth/${provider}/redirect`)
    return resp.url
}

export const socialLogin = async (provider: string | TSocialProvider, queryParams: URLSearchParams) => {
    const response =
        await get<TAuthResponse>(`/auth/${provider}/callback?${queryParams.toString()}`)
    await setSession(response.token)
}