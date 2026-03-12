"use client"

import React from 'react'
import {useRouter, useSearchParams} from "next/navigation"
import {CardContent} from "@/components/ui/card"
import z from 'zod'
import {Controller, useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {toast} from "sonner"
import Link from "next/link"
import FormCardHeader from "@/app/(auth)/_components/FormCardHeader"
import FormCard from "@/app/(auth)/_components/FormCard"
import SeparatorWithText from "@/app/(auth)/_components/SeparatorWithText"
import {resetPassword} from "@/actions/auth"
import {parseError} from "@/lib/utils"

const passwordResetFormSchema = z.object({
    token: z.string().nonempty('Token is required'),
    email: z.string().nonempty('Email is required').email('Must be a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    password_confirmation: z.string().min(8, 'Password must be at least 8 characters'),
})
    .refine((data: any) => data.password === data.password_confirmation, {
        message: "New password don't match",
        path: ["password_confirmation"],
    })


const Page = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const query = JSON.parse(atob(token ?? '{}'))
    const router = useRouter()

    const form = useForm<z.infer<typeof passwordResetFormSchema>>({
        resolver: zodResolver(passwordResetFormSchema),
        defaultValues: {
            token: query.token,
            email: query.email,
            password: "",
            password_confirmation: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof passwordResetFormSchema>) => {
        try {
            await resetPassword(data)
            router.replace("/login")
        } catch (error: any) {
            console.log('error', error)
            const {message} = parseError(error, form)
            toast.error(message)
        }
    }

    return (
        <FormCard>
            <FormCardHeader title={"New password"}/>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className={"gap-2"}>
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

                        <Controller
                            name="password_confirmation"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="fform-password-confirmation">
                                        Password confirmation
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        type="password"
                                        id="form-password-confirmation"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Password confirmation"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]}/>
                                    )}
                                </Field>
                            )}
                        />

                        <Button>Reset password</Button>

                    </FieldGroup>
                </form>

                <SeparatorWithText text={"or"}/>

                <div className={"flex items-center gap-4 w-full justify-between"}>
                    <Link href="/login">
                        <Button variant={"link"}>
                            Login
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button variant={"link"}>
                            Register
                        </Button>
                    </Link>
                </div>

            </CardContent>
        </FormCard>
    )
}

export default Page