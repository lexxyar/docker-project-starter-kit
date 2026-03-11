
import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import WorkspaceSelector from "@/app/(authorized)/workspaces/_components/WorkspaceSelector"
import {useQuery} from "@tanstack/react-query"
import {useAuth} from "@/hooks/use-auth"

// This is sample data.
const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
        {
            title: "Getting Started",
            url: "#",
            items: [
                {
                    title: "Installation",
                    url: "#",
                    isActive: false,
                },
                {
                    title: "Project Structure",
                    url: "#",
                    isActive: false,
                },
            ],
        },
    ],
}

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                {/*<VersionSwitcher*/}
                {/*    versions={data.versions}*/}
                {/*    defaultVersion={data.versions[0]}*/}
                {/*/>*/}
                {/*<SearchForm />*/}
            </SidebarHeader>
            <SidebarContent>
                <WorkspaceSelector />


                {/* We create a SidebarGroup for each parent. */}
                {data.navMain.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={item.isActive}>
                                            <a href={item.url}>{item.title}</a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}

export default AppSidebar