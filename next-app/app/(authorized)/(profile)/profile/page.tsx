"use client"

import React from 'react'
import ProfileInfo from "@/app/(authorized)/(profile)/profile/_components/ProfileInfo"
import ProfileDelete from "@/app/(authorized)/(profile)/profile/_components/ProfileDelete"


const Page = () => {

    return (
        <div>
            <ProfileInfo/>
            <ProfileDelete className={"mt-6"}/>
        </div>
    )
}

export default Page