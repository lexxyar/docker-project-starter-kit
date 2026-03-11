import React from 'react'
import Image from "next/image"
import {CardHeader} from "@/components/ui/card"
import {cn} from "@/lib/utils"

type Props = {
    title?: string,
    className?: string,
    children?: React.ReactNode,
}
const FormCardHeader = ({title, className, children}: Props) => {
    return (
        <CardHeader className={cn("", className)}>
            <div className="flex items-center gap-4">
                <Image src="logoipsum.svg" alt="logo" width={32} height={32} className={"size-8"}/>
                <h1>{title}</h1>
            </div>
            {children}
        </CardHeader>
    )
}

export default FormCardHeader