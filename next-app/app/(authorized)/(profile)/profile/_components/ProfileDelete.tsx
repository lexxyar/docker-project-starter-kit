import React from 'react'
import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {cn} from "@/lib/utils"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {useProfile} from "@/hooks/use-profile"
import z from 'zod'
import {Field, FieldError, FieldGroup} from "@/components/ui/field"
import {Controller, useForm} from "react-hook-form"
import {Input} from "@/components/ui/input"
import {zodResolver} from "@hookform/resolvers/zod"
import {useMutation} from "@tanstack/react-query"
import ValidationError from "@/classes/ValidationError"
import {toast} from "sonner"
import {useRouter} from "next/navigation"

const deleteFormSchema = z.object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
})

const ProfileDelete = ({className}: { className?: string }) => {
    const form = useForm<z.infer<typeof deleteFormSchema>>({
        resolver: zodResolver(deleteFormSchema),
        defaultValues: {
            password: "",
        },
    })
    const {deleteProfile} = useProfile()
    const router = useRouter()

    const submitMutation = useMutation<unknown, Error, string>({
        mutationFn: deleteProfile,
        onSuccess: (data) => {
            form.reset()
            router.replace("/")
        },
        onError: (error) => {
            form.reset()
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

    const onSubmit = (data: z.infer<typeof deleteFormSchema>) => {
        submitMutation.mutate(data.password)
    }

    return (
        <div className={cn("max-w-80", className)}>
            <h3 className={"mb-2"}>Danger zone</h3>
            <Card className={"border-destructive ring-destructive/50"}>
                <CardContent>
                    <div className={"flex justify-between items-center gap-4"}>
                        <div>
                            <span className={"font-semibold"}>Delete account</span>
                            <div className={"text-sm text-muted-foreground"}>
                                Delete your account and all of its resources
                            </div>
                        </div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant={"destructive"}>Delete</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your account from
                                            our servers.
                                        </AlertDialogDescription>
                                        <AlertDialogDescription>
                                            Please enter your password to confirm account deleting.

                                            <FieldGroup className={"gap-2"}>
                                                <Controller
                                                    name="password"
                                                    control={form.control}
                                                    render={({field, fieldState}) => (
                                                        <Field data-invalid={fieldState.invalid}>
                                                            <Input
                                                                {...field}
                                                                type="password"
                                                                id="form-password"
                                                                aria-invalid={fieldState.invalid}
                                                                placeholder="pasword"
                                                                autoComplete="off"
                                                            />
                                                            {fieldState.invalid && (
                                                                <FieldError errors={[fieldState.error]}/>
                                                            )}
                                                        </Field>
                                                    )}
                                                />

                                            </FieldGroup>


                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel type={"button"}>Cancel</AlertDialogCancel>
                                        <AlertDialogAction variant={"destructive"}
                                                           type={"submit"}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </form>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProfileDelete