"use server"

import {destroy, patch, put} from "@/lib/http-client"
import {deleteSession} from "@/lib/session"
import {redirect} from "next/navigation"

type TChangePasswordCredentials = {
    current_password: string
    password: string
    password_confirmation: string
}

type TUpdateProfile = {
    name: string,
    email: string,
}

export const updateProfile = async (credentials: TUpdateProfile) => {
    await patch('/profile', credentials)
}

export const changePassword = async (credentials: TChangePasswordCredentials) => {
    await put('/profile/password', credentials)
}

export const deleteProfile = async (password:string) => {
    await destroy('/profile', {password})
    await deleteSession()
}