import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {cookies} from 'next/headers'

const publicPaths = ['/login', '/register', '/', '/forgot-password', '/reset-password']

export default async function proxy(request: NextRequest) {
    // console.log('proxy') // Это должно появиться в терминале

    const authToken = (await cookies()).get('authToken')?.value
    const {pathname} = request.nextUrl

    const isPublicPath = publicPaths.includes(pathname)

    if (!authToken && !isPublicPath) {
        const loginUrl = new URL('/login', request.url)
        return NextResponse.redirect(loginUrl)
    }

    if (authToken && isPublicPath && pathname !== '/') {
        return NextResponse.redirect(new URL('/workspaces', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|ico)$).*)',
    ],
}