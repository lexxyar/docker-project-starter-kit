import apiClient from "@/lib/api-client"

type TChangePasswordCredentials = {
    current_password: string
    password: string
    password_confirmation: string
}

type TUpdateProfile = {
    name: string,
    email: string,
}

export function useProfile() {
    const http = apiClient()

    const changePassword = async (credentials: TChangePasswordCredentials) => {
        await http.put('/profile/password', credentials)
    }
    const updateProfile = async (credentials: TUpdateProfile) => {
        await http.patch('/profile', credentials)
    }
    const deleteProfile = async (password:string) => {
        await http.delete('/profile', {password})
    }
    return {
        changePassword,
        updateProfile,
        deleteProfile,
    }
}
