import React from 'react'

function Layout({
                    children,
                }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="w-screen h-screen overflow-hidden grid items-center justify-center">
            {children}
        </main>
    )
}

export default Layout