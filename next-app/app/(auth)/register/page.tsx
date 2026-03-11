import React from 'react'
import {CardContent} from "@/components/ui/card"
import AuthForm from "@/app/(auth)/_components/AuthForm"
import SocialLogin from "@/app/(auth)/_components/SocialLogin"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import FormCard from "@/app/(auth)/_components/FormCard"
import FormCardHeader from "@/app/(auth)/_components/FormCardHeader"
import SeparatorWithText from "@/app/(auth)/_components/SeparatorWithText"

function Register() {
    return (
        <FormCard>
            <FormCardHeader title={"Register"}/>
            <CardContent>
                <SocialLogin/>

                <SeparatorWithText text={"or continue with email"} className={"mb-6"}/>

                <AuthForm/>

                <SeparatorWithText text={"Already have an account?"} className={"mb-6"}/>

                <div className={"flex items-center gap-4 w-full justify-between"}>
                    <Link href="/login" className={"w-full"}>
                        <Button variant={"outline"} className={"w-full"}>
                            Sign in
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </FormCard>
    )
}

export default Register