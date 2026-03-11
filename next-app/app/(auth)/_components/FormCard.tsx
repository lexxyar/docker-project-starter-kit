import React from 'react'
import {Card} from "@/components/ui/card"

const FormCard = ({children}: { children?: React.ReactNode }) => {
    return (
        <Card className={"w-96"}>
            {children}
        </Card>
    )
}

export default FormCard