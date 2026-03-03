import {toTypedSchema} from "@vee-validate/zod"
import {z} from "zod"
import {useForm} from "vee-validate"
import {useHttp} from "@/services/api.ts"
import {useAuthStore} from "@/stores/auth.ts"
import type {TSocialProvider} from "@/types"

type TAuthMode = 'login' | 'register'

const {http} = useHttp()
const auth = useAuthStore()

const registrationFormSchema = toTypedSchema(z.object({
    email: z.string().nonempty('Email is required').email('Must be a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
}))
const loginFormSchema = toTypedSchema(z.object({
    email: z.string().nonempty('Email is required').email('Must be a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
}))

export const useAuthForm = (mode: TAuthMode) => {
    const form = useForm({
        validationSchema: mode === 'register' ? registrationFormSchema : loginFormSchema,
    })

    const submit = async () => {
        await form.handleSubmit(async (values) => {
            try {
                const response = await http.post(mode === 'register' ? '/register' : '/login', values)
                auth.setUser(response.data)
            } catch (e: any) {
                if (e.status === 422) {
                    form.setErrors(e.response?.data.errors)
                    throw Error(e.response?.data.message)
                }
                throw e
            }
        })()
    }

    const socialRedirect = async (provider: TSocialProvider) => {
        const resp = await http.get(`/auth/${provider}/redirect`)
        window.location.href = resp.data.url
    }

    const socialLogin = async (query: any) => {
        const provider = query.provider ?? ''
        const queryParams = new URLSearchParams()
        Object.keys(query).map((key: string) => {
            queryParams.set(key, query[key]?.toString() ?? '')
        })
        try {
            const response =
                await http.get(`/auth/${provider}/callback?${queryParams.toString()}`)
            auth.setUser(response.data)
        } catch (e: any) {
            if (e.status === 422) {
                form.setErrors(e.response?.data.errors)
                throw Error(e.response?.data.message)
            }
            throw e
        }
    }

    return {form, submit, busy: form.isSubmitting.value, socialRedirect, socialLogin}
}