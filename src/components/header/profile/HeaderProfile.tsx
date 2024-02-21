import { ButtonTransparent } from 'components/button/Button'
import { Dropdown } from 'components/dropdown/Dropdown'
import { TextBody } from 'components/text/Text'
import { LINKS } from 'constants/links'
import IconLogout from 'core/images/icons/IconLogout.svg'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { SImage, SItem } from './HeaderProfile.styled'

export function HeaderProfile() {
  const { t } = useTranslation()
  const router = useRouter()

  async function handleLogout() {
    await router.push(LINKS.logout)
  }

  return (
    <Dropdown
      trigger={
        <ButtonTransparent>
          <SImage
            src="/avatar.png"
            width={40}
            height={40}
            alt="avatar"
            priority
          />
        </ButtonTransparent>
      }
    >
      <SItem onClick={handleLogout}>
        <TextBody>{t('logout')}</TextBody>
        <IconLogout />
      </SItem>
    </Dropdown>
  )
}
