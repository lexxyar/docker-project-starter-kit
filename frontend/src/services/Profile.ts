import {useForm} from "vee-validate"
import {toTypedSchema} from "@vee-validate/zod"
import {z} from "zod"
import {useHttp} from "@/services/api.ts"
import {computed} from "vue"

type TProfileMain = { name: string, email: string }
type TResetPassword = { token: string, email: string }

const {http} = useHttp()

const passwordChangeFormSchema = toTypedSchema(z.object({
    current_password: z.string().min(8, 'Password must be at least 8 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    password_confirmation: z.string().min(8, 'Password must be at least 8 characters'),
})
    .refine((data: any) => data.password === data.password_confirmation, {
        message: "New password don't match",
        path: ["password_confirmation"],
    }))

const profileFormSchema = toTypedSchema(z.object({
    name: z.string().nonempty('Name is required'),
    email: z.string().nonempty('Email is required').email('Must be a valid email'),
}))

const deleteFormSchema = toTypedSchema(z.object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
}))

const forgotPasswordFormSchema = toTypedSchema(z.object({
    email: z.string().nonempty('Email is required').email('Must be a valid email'),
}))

const passwordResetFormSchema = toTypedSchema(z.object({
    token: z.string().nonempty('Token is required'),
    email: z.string().nonempty('Email is required').email('Must be a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    password_confirmation: z.string().min(8, 'Password must be at least 8 characters'),
})
    .refine((data: any) => data.password === data.password_confirmation, {
        message: "New password don't match",
        path: ["password_confirmation"],
    }))

export const usePasswordResetProfile = (credentials: TResetPassword) => {
    const form = useForm({
        validationSchema: passwordResetFormSchema, initialValues: {
            token: credentials.token,
            email: credentials.email,
        }
    })
    const submit = async () => {
        await form.handleSubmit(async (values) => {
            try {
                await http.post('/reset-password', values)
                form.resetForm()
            } catch (e: any) {
                if (e.status === 422) {
                    form.setErrors(e.response?.data.errors)
                    throw Error(e.response?.data.message)
                }
                throw e
            }
        })()
    }
    const busy = computed(() => form.isSubmitting.value)
    return {form, submit, busy}
}
export const useChangePasswordProfile = () => {
    const form = useForm({validationSchema: passwordChangeFormSchema})
    const submit = async () => {
        await form.handleSubmit(async (values) => {
            try {
                await http.put('/profile/password', values)
                form.resetForm()
            } catch (e: any) {
                if (e.status === 422) {
                    form.setErrors(e.response?.data.errors)
                    throw Error(e.response?.data.message)
                }
                throw e
            }
        })()
    }
    const busy = computed(() => form.isSubmitting.value)
    return {form, submit, busy}
}
export const useForgotPasswordProfile = () => {
    const form = useForm({validationSchema: forgotPasswordFormSchema})
    const submit = async () => {
        await form.handleSubmit(async (values) => {
            try {
                await http.post('/forgot-password', values)
                form.resetForm()
            } catch (e: any) {
                if (e.status === 422) {
                    form.setErrors(e.response?.data.errors)
                    throw Error(e.response?.data.message)
                }
                throw e
            }
        })()
    }
    const busy = computed(() => form.isSubmitting.value)
    return {form, submit, busy}
}

export const useDeleteProfile = () => {
    const form = useForm({validationSchema: deleteFormSchema})
    const submit = async () => {
        await form.handleSubmit(async (values) => {
            try {
                await http.delete('/profile', {data: values})
            } catch (e: any) {
                if (e.status === 422) {
                    form.setErrors(e.response?.data.errors)
                    throw Error(e.response?.data.message)
                }
                throw e
            }
        })()
    }
    const busy = computed(() => form.isSubmitting.value)
    return {form, submit, busy}
}

export const useProfileInfo = (user?: TProfileMain) => {
    const form = useForm({
        validationSchema: profileFormSchema, initialValues: {
            name: user?.name,
            email: user?.email,
        }
    })
    const submit = async () => {
        await form.handleSubmit(async (values) => {
            try {
                await http.patch('/profile', values)
            } catch (e: any) {
                if (e.status === 422) {
                    form.setErrors(e.response?.data.errors)
                    throw Error(e.response?.data.message)
                }
                throw e
            }
        })()
    }
    const busy = computed(() => form.isSubmitting.value)
    return {form, submit, busy}
}