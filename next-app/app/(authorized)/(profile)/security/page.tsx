"use client"
import React from 'react'
import z from 'zod'
import {Controller, useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {useMutation} from "@tanstack/react-query"
import ValidationError from "@/classes/ValidationError"
import {toast} from "sonner"
import {useProfile} from "@/hooks/use-profile"

const passwordChangeFormSchema = z.object({
    current_password: z.string().min(8, 'Password must be at least 8 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    password_confirmation: z.string().min(8, 'Password must be at least 8 characters'),
})
    .refine((data: any) => data.password === data.password_confirmation, {
        message: "New password don't match",
        path: ["password_confirmation"],
    })

const Page = () => {
    const form = useForm<z.infer<typeof passwordChangeFormSchema>>({
        resolver: zodResolver(passwordChangeFormSchema),
        defaultValues:{
            current_password: "",
            password: "",
            password_confirmation: "",
        }
    })
    const {changePassword} = useProfile()

    const submitMutation = useMutation<unknown, Error, z.infer<typeof passwordChangeFormSchema>>({
        mutationFn: changePassword, // Передаем функцию, которую нужно выполнить
        onSuccess: (data) => {
            // router.push('/workspaces')
            form.reset()
            toast.success('Password changed successfully.')
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
            form.setError('root.serverError', {message: error.message})
            toast.error(error.message)
        },
    })

    const onSubmit = (data: z.infer<typeof passwordChangeFormSchema>) => {
        submitMutation.mutate(data)
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className={"max-w-80"}>
            <FieldGroup className={"gap-2"}>
                <Controller
                    name="current_password"
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-current-password">
                                Current password
                            </FieldLabel>
                            <Input
                                {...field}
                                type="password"
                                id="form-current-password"
                                aria-invalid={fieldState.invalid}
                                placeholder="Current password"
                                autoComplete="off"
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
                                New password
                            </FieldLabel>
                            <Input
                                {...field}
                                type="password"
                                id="form-password"
                                aria-invalid={fieldState.invalid}
                                placeholder="new password"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]}/>
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="password_confirmation"
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-password-confirmation">
                                Password confirmation
                            </FieldLabel>
                            <Input
                                {...field}
                                type="password"
                                id="form-password-confirmation"
                                aria-invalid={fieldState.invalid}
                                placeholder="Confirm new password"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]}/>
                            )}
                        </Field>
                    )}
                />

                <Button className={"w-fit"}>Change password</Button>

            </FieldGroup>

        </form>
    )
}

export default Page