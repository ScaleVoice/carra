import { css } from '@emotion/react'
import { Spinner } from 'components/spinner/Spinner'
import { LINKS } from 'constants/links'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import { decodeKeycloakJWT } from 'utils/keycloak'

interface Props {
  children: ReactNode
}

export function Auth({ children }: Props) {
  const router = useRouter()

  const { status, data } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push(LINKS.login)
    }
  })

  console.log('status', status)

  // in case the user's rights have been revoked
  useEffect(() => {
    if (status !== 'loading') {
      // const decodedJWT = decodeKeycloakJWT(data.user?.access as string)
      // const roles = Object.values(decodedJWT.realm_access.roles)

      // if (!roles.includes('APP_ACCESS:TICKING_APP')) {
      //   signOut()
      // }
    }
  }, [status, data])

  if (status === 'loading') {
    return (
      <div
        css={css`
          display: grid;
          place-items: center;
          height: 100vh;
        `}
      >
        <Spinner />
      </div>
    )
  }

  return <div>{children}</div>
}
