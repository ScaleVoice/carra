import { LINKS } from 'constants/links'
import { GetServerSideProps } from 'next'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useOpenId } from 'utils/auth/useOpenId'
import { getIntlProps } from 'utils/i18n/getIntlProps'
import { isString } from 'utils/types'

type Props = {
  token_id: string | null
}

function Page({ token_id }: Props) {
  const router = useRouter()
  const { logout: openIdLogout } = useOpenId()
  const session = useSession()

  useEffect(() => {
    const logout = async () => {
      const logoutToken = token_id ? token_id : session?.data?.user?.idToken

      await openIdLogout(logoutToken)
      await signOut({ callbackUrl: LINKS.login })

      router.push(LINKS.login)
    }

    logout()
  }, [router, openIdLogout, session?.data?.user?.idToken, token_id])

  return null
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const { token_id } = ctx.query

  return {
    props: {
      ...(await getIntlProps(ctx)),
      token_id: isString(token_id) ? token_id : null
    }
  }
}

export default Page
