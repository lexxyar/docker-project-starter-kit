"use client"
import React, {useState} from 'react'
import {CardContent} from "@/components/ui/card"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import z from 'zod'
import {Controller, useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field"
import {Input} from "@/components/ui/input"
import {useMutation} from "@tanstack/react-query"
import {toast} from "sonner"
import {CircleCheckBigIcon} from "lucide-react"
import FormCardHeader from "@/app/(auth)/_components/FormCardHeader"
import FormCard from "@/app/(auth)/_components/FormCard"
import SeparatorWithText from "@/app/(auth)/_components/SeparatorWithText"
import {parseError} from "@/lib/utils"
import {emailResetPasswordLink} from "@/actions/auth"

const forgotPasswordFormSchema = z.object({
    email: z
        .string()
        .email(),
})

const Page = () => {
    const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
        resolver: zodResolver(forgotPasswordFormSchema),
        defaultValues: {
            email: "",
        },
    })
    const [status, setStatus] = useState(false)

    const submitMutation = useMutation<unknown, Error, string>({
        mutationFn: emailResetPasswordLink,
        onSuccess: (data) => {
            setStatus(true)
        },
        onError: (error) => {
            const {message} = parseError(error, form)
            toast.error(message)
        },
    })

    const onSubmit = (data: z.infer<typeof forgotPasswordFormSchema>) => {
        submitMutation.mutate(data.email)
    }

    return (
        <FormCard>
            {!status &&
                <>
                    <FormCardHeader title={"Forgot password"}>
                        <div className={"text-muted-foreground text-sm"}>
                            Forgot your password? No problem. Just let us know your email
                            address and we will email you a password reset link that
                            will allow you to choose a new one.
                        </div>
                    </FormCardHeader>
                </>
            }
            <CardContent>
                {!status
                    ? (<>
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

                                <Button>Email password reset link</Button>

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
                    </>)
                    : (
                        <div className={"w-full flex flex-col gap-6 items-center justify-center text-center"}>
                            <CircleCheckBigIcon className={"size-10"}/>
                            <div>
                                We have send the code. Check your email.
                            </div>
                        </div>
                    )
                }
            </CardContent>
        </FormCard>
    )
}

export default Page