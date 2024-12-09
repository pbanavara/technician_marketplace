import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
    matcher: ['/chat/:path*']
}

export function middleware(request: NextRequest) {
    return NextResponse.next()
}