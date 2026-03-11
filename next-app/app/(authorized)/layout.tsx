import React from 'react'
import {SidebarInset, SidebarProvider, SidebarTrigger,} from "@/components/ui/sidebar"
import {Separator} from "@/components/ui/separator"
import AppSidebar from "@/app/(authorized)/workspaces/_components/AppSidebar"
import ProfileMenu from "@/app/(authorized)/workspaces/_components/ProfileMenu"

const Layout = ({
                    children,
                }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <header className={"flex items-center justify-between h-16 shrink-0 border-b px-4"}>
                    <div className="flex  items-center gap-2 ">

                        <SidebarTrigger className="-ml-1"/>
                        <Separator
                            orientation="vertical"
                        />

                    </div>
                    <div>
                        <ProfileMenu/>
                    </div>
                </header>
                <div className="w-full p-4">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Layout