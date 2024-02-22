import { authMiddleware } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

const SIGN_UP_PATH = '/sign-up'
const SIGN_IN_PATH = '/sign-in'

export default authMiddleware({
  publicRoutes: [SIGN_UP_PATH, SIGN_IN_PATH],
  apiRoutes: ['/api(.)*'],
  debug: false,
  afterAuth(auth, req, evt) {
    const isPublicRoute = auth.isPublicRoute

    if (Boolean(auth.userId) || isPublicRoute) {
      return NextResponse.next()
    }

    const shouldRedirectToSignIn = ![SIGN_UP_PATH, SIGN_IN_PATH].includes(
      req.nextUrl.pathname
    )
    if (shouldRedirectToSignIn) {
      const signInUrl = new URL(SIGN_IN_PATH, req.url)
      return NextResponse.redirect(signInUrl)
    }

    return NextResponse.next()
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
