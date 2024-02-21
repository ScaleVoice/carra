import { css } from '@emotion/react'
import { Flex } from 'components/Flex'
import { SAuresAppsLogo } from 'components/header/Header.styled'
import { Spacer } from 'components/spacer/Spacer'
import { TextHeader } from 'components/text/Text'
import { LINKS } from 'constants/links'
import Logo from 'core/images/Logo.svg'
import { media } from 'core/styles/media'
import { size } from 'core/styles/spacing'
import { GetServerSideProps } from 'next'
import { signIn, useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { LoginLayout } from 'sections/login/Login'
import {
  SButton,
  SDriverWrapper,
  SError,
  SLoginActions,
  SLoginLogoContainer
} from 'sections/login/Login.styled'
import { getIntlProps } from 'utils/i18n/getIntlProps'
import { addSearchParams } from 'utils/searchParams'
import { isString } from 'utils/types'

interface Props {
  error: {
    idToken: string
    reason: string
    email: string
  } | null
}

export default function Page({ error }: Props) {
  const { t } = useTranslation(['login'])
  const session = useSession()
  const router = useRouter()
  // const { login } = useOpenId()

  const [submitting, setSubmitting] = useState(false)

  const handleLogin = async () => {
    setSubmitting(true)

    // const keycloakLoginStatus = await login()

    //sign in, then redirect
    await signIn(
      'baas',
      { callbackUrl: '/' },
      {
        authorizationCode: 'test'
      }
    )

    setSubmitting(false)
  }

  const handleLogout = async () => {
    await router.push(
      addSearchParams(LINKS.logout, { token_id: error?.idToken })
    )
  }

  return (
    <LoginLayout>
      <SLoginLogoContainer variant="row" align="center">
        <SAuresAppsLogo>
          <Logo />
        </SAuresAppsLogo>
      </SLoginLogoContainer>

      <SLoginActions>
        <Flex
          variant="column"
          css={css`
            @media ${media.lte('SM')} {
              padding: 0 ${size(5)};
            }
          `}
        >
          <TextHeader variant={['h3', 'h2']} as="h2">
            {t('login:logIn')}
          </TextHeader>

          <Spacer size={6} axis="vertical" />

          {error && (
            <>
              <SError color="warning">{t('login:logIn_error')}</SError>
              <Spacer size={4} axis="vertical" />
            </>
          )}

          <SButton
            variant="primary"
            onClick={handleLogin}
            disabled={submitting}
          >
            {t('login:logIn')}
          </SButton>

          {(error || session.data) && (
            <>
              <Spacer size={4} axis="vertical" />
              <SButton variant="outline" onClick={handleLogout}>
                {t('login:logOut')}
              </SButton>
            </>
          )}
        </Flex>

        <SDriverWrapper>
          <Image
            src="/images/Driver.png"
            width={396}
            height={576}
            alt="driver"
          />
        </SDriverWrapper>
      </SLoginActions>
    </LoginLayout>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const { reason, email, idToken } = ctx.query

  const error =
    isString(reason) && isString(email) && isString(idToken)
      ? { reason, email, idToken }
      : null

  return {
    props: {
      ...(await getIntlProps(ctx, 'login')),
      error
    }
  }
}
