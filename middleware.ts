import { getToken } from "next-auth/jwt"
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server"

export default async function middleware(req: any) {

    if (!req?.url) return NextResponse.next()
    const token = await getToken({ req })

    const isAuthenticated = !!token
    const requestHeaders = new Headers(req.headers)
    const api_key = requestHeaders.get('Authorization')

    // TODO: if sessionId is sent as a query parameter -> check if session.id is equal to sessionId
    // TODO: restrict API routes according to Role of user
    if (!req.nextUrl.pathname.startsWith("/api/auth") && !req.nextUrl.pathname.startsWith("/api/users") && req.nextUrl.pathname.startsWith("/api/") && !isAuthenticated && api_key != process.env.API_KEY_FOR_BACKEND) {
        return new Response('Unauthorized', { status: 401 })
    }

    if (
        !isAuthenticated &&
        (req.nextUrl.pathname === "/")
    ) {
    //    return NextResponse.redirect(new URL("/auth/login", req.url))
    }

    if (
        isAuthenticated &&
        (req.nextUrl.pathname.startsWith("/auth/"))
    ) {
        return NextResponse.redirect(new URL("/", req.url))
    }

    return NextResponse.next()
}
