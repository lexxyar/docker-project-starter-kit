"use client"

import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {useQuery} from "@tanstack/react-query"
import {getInitials} from "@/lib/utils"
import {useRouter} from "next/navigation"
import {currentUser, logout} from "@/actions/auth"

const ProfileMenu = () => {
    const {data: user} = useQuery({
        queryKey: ['currentUser'],
        queryFn: currentUser,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })

    const router = useRouter()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    {/*<AvatarImage src="https://github.com/shadcn.png"/>*/}
                    <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={"end"} className={"min-w-fit"}>
                <DropdownMenuGroup>
                    <DropdownMenuLabel className={"grid grid-cols-[64px_1fr] gap-4"}>
                        <Avatar className={"size-16"}>
                            {/*<AvatarImage src="https://github.com/shadcn.png"/>*/}
                            <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                        </Avatar>
                        <div className={"grow"}>
                            <h3>{user?.name}</h3>
                            <div>{user?.email}</div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={() => router.push('/profile')}>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProfileMenu