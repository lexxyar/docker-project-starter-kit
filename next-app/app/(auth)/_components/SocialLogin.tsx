"use client"

import React from 'react'
import {Button} from "@/components/ui/button"
import YandexIcon from "@/components/icons/YandexIcon"
import GoogleIcon from "@/components/icons/GoogleIcon"
import {cn} from "@/lib/utils"
import {socialRedirect} from "@/actions/auth"

function SocialLogin(props: { className?: string }) {
    const handleRedirect = async(provider:string) => {
        window.location.href = await socialRedirect(provider as any)
    }
    return (
        <div className={cn("grid gap-2", props.className)}>
            <Button onClick={() => handleRedirect('yandex')}>
                <YandexIcon/>
                Yandex ID
            </Button>
            <Button onClick={() => handleRedirect('google')}>
                <GoogleIcon/>
                Google
            </Button>
        </div>
    )
}

export default SocialLogin