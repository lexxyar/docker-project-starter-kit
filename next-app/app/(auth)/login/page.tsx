"use client"

import React from 'react'
import {CardContent} from "@/components/ui/card"
import AuthForm from "@/app/(auth)/_components/AuthForm"
import SocialLogin from "@/app/(auth)/_components/SocialLogin"
import {Button} from "@/components/ui/button"
import Link from 'next/link'
import {useRouter, useSearchParams} from "next/navigation"
import FormCard from "@/app/(auth)/_components/FormCard"
import FormCardHeader from "@/app/(auth)/_components/FormCardHeader"
import SeparatorWithText from "@/app/(auth)/_components/SeparatorWithText"
import {socialLogin} from "@/actions/auth"

function Register() {
    const searchParams = useSearchParams()
    const router = useRouter()

    if (searchParams.size > 0) {
        if (searchParams.has("m") && searchParams.get("m") === 'auth' && searchParams.has("provider")) {
            const provider = searchParams.get("provider") as string
            const queryParams = new URLSearchParams()
            searchParams.entries().forEach((value: [string, string]) => {
                queryParams.set(value[0], value[1])
            })
            socialLogin(provider, queryParams).then(() => {
                router.push('/workspaces')
            })
        }
    }
    // console.log(searchParams)

    return (
        <FormCard>
            <FormCardHeader title={"Login"}/>
            <CardContent>
                <SocialLogin/>
                <SeparatorWithText text={"or continue with email"} className={"mb-6"}/>

                <AuthForm/>

                <SeparatorWithText text={"Can't login?"}/>

                <div className={"flex items-center gap-4 w-full justify-between"}>
                    <Link href="/forgot-password">
                        <Button variant={"link"}>
                            Forgot password
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

export default Register