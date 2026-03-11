"use client"

import React from 'react'
import {Button} from "@/components/ui/button"
import YandexIcon from "@/components/icons/YandexIcon"
import GoogleIcon from "@/components/icons/GoogleIcon"
import {cn} from "@/lib/utils"
import {useAuth} from "@/hooks/use-auth"

function SocialLogin(props: { className?: string }) {
    const {socialRedirect} = useAuth()
    return (
        <div className={cn("grid gap-2", props.className)}>
            <Button onClick={() => socialRedirect('yandex')}>
                <YandexIcon/>
                Yandex ID
            </Button>
            <Button onClick={() => socialRedirect('google')}>
                <GoogleIcon/>
                Google
            </Button>
        </div>
    )
}

export default SocialLogin