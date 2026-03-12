"use server"

import {cookies} from "next/headers"

export const setSession = async (token: string) => {
    const cookieStorage = await cookies()
    cookieStorage.set('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
    })
}

export const getSession = async (): Promise<string | undefined> => {
    const cookieStorage = await cookies()
    return cookieStorage.get('authToken')?.value
}

export const deleteSession = async () => {
    const cookieStorage = await cookies()
    cookieStorage.delete('authToken')
}