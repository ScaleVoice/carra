import i18nConfig from "@/i18n/i18nConfig"
import { authMiddleware } from "@clerk/nextjs"
import { i18nRouter } from "next-i18n-router"
import { NextResponse } from "next/server"

const SIGN_UP_PATH = "/sign-up"
const SIGN_IN_PATH = "/sign-in"

export default authMiddleware({
  publicRoutes: [SIGN_UP_PATH, SIGN_IN_PATH],
  apiRoutes: ["/api(.)*"],
  debug: false,
  afterAuth(auth, req, evt) {
    const isPublicRoute = auth.isPublicRoute

    if (Boolean(auth.userId) || isPublicRoute) {
      return i18nRouter(req, i18nConfig)
    }

    const shouldRedirectToSignIn = ![SIGN_UP_PATH, SIGN_IN_PATH].includes(req.nextUrl.pathname)
    if (shouldRedirectToSignIn) {
      const signInUrl = new URL(SIGN_IN_PATH, req.url)
      return NextResponse.redirect(signInUrl)
    }

    return i18nRouter(req, i18nConfig)
  },
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
