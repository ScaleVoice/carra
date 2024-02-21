import { HeaderProfile } from 'components/header/profile/HeaderProfile'
import { LINKS } from 'constants/links'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import IconAppointments from 'core/images/icons/IconAppointments.svg'
import IconCallCustomer from 'core/images/icons/IconCallCustomer.svg'
import IconHistory from 'core/images/icons/IconHistory.svg'
import IconSearch from 'core/images/icons/IconSearch.svg'
import IconTrades from 'core/images/icons/IconTrades.svg'

import {
  SAuresAppsLogo,
  SContainer,
  SHeaderActions,
  SHeaderLink,
  SHeaderLinksWrapper,
  SLogo
} from './Header.styled'
import { useRedirectModal } from 'components/redirect/RedirectModal'
import { useRouter } from 'next/router'
import { HeaderLink } from './HeaderLink'

interface Props {
  defaultSearch?: string | null
  searchCar?: (value: string) => void
  variant?: 'night' | 'white' | 'transparent'
  hasShadow?: boolean
  className?: string
  searchInputPlaceholder?: string
}

export function Header({ variant, hasShadow, className }: Props) {
  const { t } = useTranslation()
  const router = useRouter()

  // const { session, loading } = useSession()

  const isLoginPage = router.pathname === LINKS.login

  // const isUser = session?.access_token !== undefined && !loading

  return (
    <>
      <SContainer
        hasShadow={hasShadow}
        background={variant}
        className={className}
      >
        <SAuresAppsLogo>
          <Link href={LINKS.home} passHref>
            <SLogo />
          </Link>
        </SAuresAppsLogo>

        {!isLoginPage && (
          <>
            <SHeaderLinksWrapper
              variant="row"
              justify="center"
              align="center"
              css={{
                flex: 1,
                display: isLoginPage ? 'none' : 'flex',
                height: 48
              }}
              gap={8}
            >
              <>
                <HeaderLink
                  href={LINKS.tickingList}
                  label={t('header_home_link')}
                  Icon={<IconCallCustomer />}
                />

                <HeaderLink
                  href={LINKS.tickingList}
                  label={t('header_appointments_link')}
                  Icon={<IconAppointments />}
                />

                <HeaderLink
                  href={LINKS.tickingList}
                  label={t('header_auctions_link')}
                  Icon={<IconTrades />}
                />
              </>
            </SHeaderLinksWrapper>

            <SHeaderActions>
              <HeaderProfile />
            </SHeaderActions>
          </>
        )}
      </SContainer>
    </>
  )
}
