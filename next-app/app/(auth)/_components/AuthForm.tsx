"use client"

import React from 'react'
import * as z from 'zod'
import {Controller, useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {useMutation} from "@tanstack/react-query"
import ValidationError from "@/classes/ValidationError"
import {toast} from "sonner"
import {useAuth} from "@/hooks/use-auth"
import {usePathname, useRouter} from "next/navigation"


type LoginInput = {
    email: string
    password: string
}

const authFormSchema = z.object({
    email: z
        .string()
        .email(),
    password: z
        .string()
        .min(8, {message: "Password must be at least 8 characters"}),
})


function AuthForm() {
    const form = useForm<z.infer<typeof authFormSchema>>({
        resolver: zodResolver(authFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const {login, register} = useAuth()
    const pathname = usePathname()
    const router = useRouter()

    const submitMutation = useMutation<unknown, Error, LoginInput>({
        mutationFn: pathname === '/register' ? register : login, // Передаем функцию, которую нужно выполнить
        onSuccess: (data) => {
            router.push('/workspaces')
        },
        onError: (error) => {
            if (error instanceof ValidationError) {
                console.log(error.errors)
                Object.keys(error.errors).forEach((key) => {
                    error.errors[key].map((errorText: string) => {
                        // @ts-ignore
                        form.setError(key, {message: errorText})
                    })
                })
            }
            // Пример: установка глобальной ошибки формы
            form.setError('root.serverError', {message: error.message})
            toast.error(error.message)
        },
    })
    const onSubmit = (data: z.infer<typeof authFormSchema>) => {
        submitMutation.mutate({email: data.email, password: data.password})
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className={"gap-2"}>
                <Controller
                    name="email"
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-email">
                                Email
                            </FieldLabel>
                            <Input
                                {...field}
                                type="email"
                                id="form-email"
                                aria-invalid={fieldState.invalid}
                                placeholder="john@mail.com"
                                autoComplete="email"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]}/>
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="password"
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-password">
                                Password
                            </FieldLabel>
                            <Input
                                {...field}
                                type="password"
                                id="form-password"
                                aria-invalid={fieldState.invalid}
                                placeholder="Password"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]}/>
                            )}
                        </Field>
                    )}
                />

                <Button>Submit</Button>

            </FieldGroup>

        </form>
    )
}

export default AuthForm