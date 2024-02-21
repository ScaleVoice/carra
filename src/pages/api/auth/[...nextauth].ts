import { HTTPMethod } from 'constants/httpMethod'
import { paths } from 'core/api/generated/employees'
import { NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt/types'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { createAcceptHeaderWithVersion } from 'utils/fetch'
import { decodeKeycloakJWT } from 'utils/keycloak'

type LoginResponse =
  paths['/employees/login']['post']['responses']['200']['content']['application/com.driverama-v2+json']

// const refreshAccessToken = async (token: JWT) => {
//   const requestUrl = `${
//     process.env.NEXT_PUBLIC_API_URL as string
//   }/employees/tokens/refresh?refreshToken=${token.user?.refreshToken}`

//   const response = await fetch(requestUrl, {
//     method: HTTPMethod.POST,
//     headers: {
//       Accept: createAcceptHeaderWithVersion(2),
//       'Content-Type': 'application/json'
//     }
//   })

//   const result = await response.json()

//   return {
//     ...token,
//     user: {
//       ...token.user,
//       access: result.accessToken,
//       expires: Date.now() + (result?.expiresInS ?? 0) * 1000,
//       refreshExpires: Date.now() + (result.refreshExpiresInS ?? 0) * 1000,
//       refreshToken: result.refreshToken,
//       idToken: result.idToken
//     }
//   }
// }

const refreshAccessToken = (token: JWT) => {
  return {
    ...token,
    user: {
      ...token.user,
      access: 'accessToken',
      expires: Date.now(),
      refreshExpires: Date.now() * 1000,
      refreshToken: 'refreshToken',
      idToken: 'idToken'
    }
  }
}

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development' ? true : false,
  providers: [
    CredentialsProvider({
      id: 'baas',
      name: 'baas',
      credentials: {},
      // async authorize(_, req) {
      //   const params = req.query

      //   const body = JSON.stringify({
      //     authorizationCode: params?.authorizationCode,
      //     redirectUri: params?.redirectUri
      //   })

      //   const requestUrl = `${
      //     process.env.NEXT_PUBLIC_API_URL as string
      //   }/employees/login`

      //   const response = await fetch(requestUrl, {
      //     headers: {
      //       Accept: createAcceptHeaderWithVersion(2),
      //       'Content-Type': 'application/json'
      //     },
      //     method: 'POST',
      //     body
      //   })

      //   const result: LoginResponse = await response.json()

      //   if (!result.accessToken) {
      //     return null
      //   }

      //   const user = decodeKeycloakJWT(result.accessToken)

      //   // return to next-auth user object when signing in
      //   return {
      //     refreshToken: result.refreshToken,
      //     access: result.accessToken,
      //     expires: Date.now() + (result.expiresInS ?? 0) * 1000,
      //     refreshExpires: Date.now() + (result.refreshExpiresInS ?? 0) * 1000,
      //     idToken: result.idToken,
      //     id: user.sid,
      //     email: user.email,
      //     name: user.name
      //   }
      // }
      async authorize() {
        return {
          refreshToken: 'refreshToken',
          access: 'accessToken',
          expires: Date.now(),
          refreshExpires: Date.now() * 1000,
          idToken: 'idToken',
          id: 'sid',
          email: 'user@email.com',
          name: 'username'
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    // 2 days
    maxAge: 2 * 24 * 60 * 60
  },
  callbacks: {
    // async signIn({ user }) {
    //   if (user.access) {
    //     const decodedJWT = decodeKeycloakJWT(user.access)

    //     const userRoles = Object.values(decodedJWT.realm_access.roles)

    //     if (userRoles.includes('APP_ACCESS:TICKING_APP')) {
    //       return true
    //     }
    //   }

    //   return `/login?reason=AccessDenied&email=${user.email}&idToken=${user.idToken}`
    // },
    async signIn({ user }) {
      return true
    },
    async session({ session, token }) {
      session.user = token.user

      return session
    },
    async jwt({ token, user }) {
      // user object exists just in a sign-in flow
      if (user) {
        token.user = user
      } else {
        // check if the access token is valid
        if (Date.now() > token.user?.expires) {
          return refreshAccessToken(token)
        }
      }

      return token
    }
  }
}

export default NextAuth(authOptions)
