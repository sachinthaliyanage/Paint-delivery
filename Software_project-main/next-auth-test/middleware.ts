import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isProtectedPath = path === '/mappg'

  const token = request.cookies.get('token')?.value || ''

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
}

export const config = {
  matcher: [
    '/mappg',
    '/mappg/:path*',
    '/history'
    ]
}

