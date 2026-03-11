import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define public paths that don't require authentication
const publicPaths = ['/login', '/register', '/'];

export function proxy(request: NextRequest) {
    const authToken = request.cookies.get('authToken')?.value;
    const { pathname } = request.nextUrl;

    // Check if the route is a public path
    const isPublicPath = publicPaths.includes(pathname);

    // If the user is not authenticated and trying to access a protected route, redirect to login
    if (!authToken && !isPublicPath) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // If the user is authenticated and trying to access a public path, redirect to dashboard
    if (authToken && isPublicPath && pathname !== '/') {
        return NextResponse.redirect(new URL('/workspaces', request.url));
    }

    // Allow the request to proceed
    return NextResponse.next();
}

// Указываем, для каких путей запускать proxy
export const config = {
    matcher: ['/workspaces/:path*', '/profile/:path*'],
};