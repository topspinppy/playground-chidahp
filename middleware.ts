import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Add the pathname to headers so we can access it in the layout
  response.headers.set('x-pathname', request.nextUrl.pathname)
  
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/affiliate/admin')) {
    // Allow login and register pages
    if (request.nextUrl.pathname === '/affiliate/admin/login' || request.nextUrl.pathname === '/affiliate/admin/register') {
      return response
    }
    
    // Check for auth token
    const token = request.cookies.get('auth-token')?.value
    
    if (!token) {
      return NextResponse.redirect(new URL('/affiliate/admin/login', request.url))
    }
    
    try {
      // Verify token
      jwt.verify(token, JWT_SECRET)
    } catch (error) {
      // Token is invalid, redirect to login
      return NextResponse.redirect(new URL('/affiliate/admin/login', request.url))
    }
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}