import 'next-auth'

// nextauth.d.ts
declare module 'next-auth' {
  interface User {
    email?: string
    name: string
    id?: string
    access?: string
    expires: number
    refreshToken?: string
    refreshExpires: number
    idToken?: string
  }

  /**
   * Returned by `useSession`, `getSession` and received as
   * a prop on the `SessionProvider` React Context
   */
  interface Session {
    expires: number
    user?: User
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    access?: string
    expires: number
    refreshToken?: string
    refreshExpires: number
    idToken?: string
    exp?: number
    iat?: number
    jti?: string
    user?: User
  }
}
