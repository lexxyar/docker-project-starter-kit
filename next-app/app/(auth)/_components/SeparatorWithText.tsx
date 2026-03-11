import React from 'react'
import {Separator} from "@/components/ui/separator"
import {cn} from "@/lib/utils"

const SeparatorWithText = ({className, text}: { className?: string, text?: string }) => {
    return (
        <div className={cn("mt-6 mb-2 flex items-center justify-between gap-3 w-full", className)}>
            <Separator className={"flex-1"}/>
            <span className={"text-muted-foreground"}>{text}</span>
            <Separator className={"flex-1"}/>
        </div>
    )
}

export default SeparatorWithText