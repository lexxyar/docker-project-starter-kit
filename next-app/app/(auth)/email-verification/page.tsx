"use client"

import React, {useEffect, useState} from 'react'
import FormCard from "@/app/(auth)/_components/FormCard"
import FormCardHeader from "@/app/(auth)/_components/FormCardHeader"
import {CardContent} from "@/components/ui/card"
import {Spinner} from "@/components/ui/spinner"
import {useRouter, useSearchParams} from "next/navigation"
import {get} from "@/lib/http-client"
import config from "@/lib/config"

const Page = () => {
    const [status, setStatus] = useState<boolean | null>(null)
    const searchParams = useSearchParams()
    const router = useRouter()

    const url = atob(searchParams.get('token') ?? '')
        .replace(config().baseUrl, '')

    useEffect(() => {
        get(url)
            .then((res: any) => {
                setStatus(true)
                setTimeout(() => router.replace('/workspaces'), 2000)
            })
            .catch(() => {
                setStatus(false)
            })
    }, [])

    return (
        <FormCard>
            <FormCardHeader title={"Email verification"}/>
            <CardContent>
                {status === null && (
                    <div className={"flex items-center gap-4 w-full"}>
                        <Spinner/>
                        Verifying...
                    </div>
                )}
                {status === true && (
                    <div className={"flex items-center gap-4 w-full"}>
                        Verified!
                    </div>
                )}

                {status === false && (
                    <div className={"flex items-center gap-4 w-full"}>
                        Error
                    </div>
                )}
            </CardContent>
        </FormCard>
    )
}

export default Page