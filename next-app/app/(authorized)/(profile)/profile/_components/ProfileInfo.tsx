"use client"

import React, {useEffect} from 'react'
import z from 'zod'
import {Controller, useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {useMutation, useQuery} from "@tanstack/react-query"
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import ValidationError from "@/classes/ValidationError"
import {toast} from "sonner"
import {currentUser} from "@/actions/auth"
import {updateProfile} from "@/actions/profile"

const profileFormSchema = z.object({
    name: z.string(),
    email: z
        .string()
        .email(),
})

const ProfileInfo = () => {
    const {data: user, isLoading} = useQuery({
        queryKey: ['currentUser'],
        queryFn: currentUser,
    })
    const form = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: user?.name ?? '',
            email: user?.email ?? '',
        },
    })

    useEffect(() => {
        console.log('fetching user', user)
        form.setValue('name', user?.name ?? '')
        form.setValue('email', user?.email ?? '')
    }, [user])

    const submitMutation = useMutation<unknown, Error, z.infer<typeof profileFormSchema>>({
        mutationFn: updateProfile,
        onSuccess: (data) => {
            toast.success('Profile updated successfully.')
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
    const onSubmit = (data: z.infer<typeof profileFormSchema>) => {
        submitMutation.mutate(data)
    }
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className={"max-w-80"}>
            <FieldGroup className={"gap-2"}>
                <Controller
                    name="name"
                    control={form.control}
                    disabled={isLoading}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-name">
                                Name
                            </FieldLabel>
                            <Input
                                {...field}
                                id="form-name"
                                aria-invalid={fieldState.invalid}
                                placeholder="Name"
                                autoComplete="name"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]}/>
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="email"
                    control={form.control}
                    disabled={isLoading}
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

                <Button disabled={isLoading} className={"w-fit"}>Save changes</Button>

            </FieldGroup>

        </form>
    )
}

export default ProfileInfo