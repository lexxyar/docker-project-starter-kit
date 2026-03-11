"use client"

import React from 'react'
import {usePathname, useRouter} from "next/navigation"
import {SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar"

const userMenu = [
    {title: 'Profile', path: "/profile", isActive: false},
    {title: 'Security', path: "/security", isActive: false},
]

const Layout = ({children}: { children?: React.ReactNode }) => {
    const router = useRouter()
    const pathname = usePathname()

    userMenu.map((e: any) => e.isActive = false)
    const found = userMenu
        .find((e: any) => e.path === pathname)
    if (found) {
        found.isActive = true
    }

    return (
        <>
            <div className={"mb-6 mt-2"}>
                <h1>Settings</h1>
            </div>
            <div className={"w-full grid grid-cols-[210px_minmax(1,1fr)] gap-4"}>
                <div>
                    <div>
                        <div>
                            <SidebarContent>
                                <SidebarMenu>
                                    {userMenu.map((item) => (
                                        <SidebarMenuItem key={item.path}>
                                            <SidebarMenuButton isActive={item.isActive}
                                                               onClick={() => router.push(item.path)}
                                            >
                                                {item.title}
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarContent>
                        </div>
                    </div>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout