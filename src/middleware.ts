import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';


export const config = {
    matcher: ['/chat/:path*', '/technician/:path*']
}

export function middleware(request: NextRequest) {
    console.log('Middleware path:', request.nextUrl.pathname);

    return NextResponse.next();
}