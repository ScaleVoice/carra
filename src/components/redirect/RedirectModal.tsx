import { css } from '@emotion/react'
import { Flex } from 'components/Flex'
import { Button } from 'components/button/Button'
import { useModal } from 'components/modal/Modal'
import { useCloseModalContext } from 'components/modal/Modal.utils'
import { Spacer } from 'components/spacer/Spacer'
import { TextHeader } from 'components/text/Text'
import { size } from 'core/styles/spacing'
import { useTranslation } from 'next-i18next'

interface Args {
  redirectTo: 'auctions' | 'appointments'
}

export type Redirects = {
  [key in Args['redirectTo']]: {
    url: string
    dialogTitle: string
  }
}

export function useRedirects(): Redirects {
  const { t } = useTranslation()

  return {
    auctions: {
      url: 'https://auctions.baas-dev.buywheelz.com',
      dialogTitle: t('header_redirect_modal_auctions_redirect')
    },
    appointments: {
      url: 'https://appointments.baas-dev.buywheelz.com/',
      dialogTitle: t('header_redirect_modal_appointments_redirect')
    }
  }
}

function RedirectModal({ redirectTo }: Args) {
  const { t } = useTranslation()

  const { dialogTitle, url } = useRedirects()[redirectTo]

  const close = useCloseModalContext()

  const onConfirm = () => {
    window.open(url, '_blank')

    close()
  }

  return (
    <Flex variant="column">
      <TextHeader variant={['h4', 'h3']}>{dialogTitle}</TextHeader>

      <Spacer size={10} axis="vertical" />

      <Flex variant="row" align="center" gap={4}>
        <Button
          variant="outline"
          css={css`
            flex: 1;
            padding: ${size(4)} 0;
          `}
          onClick={close}
        >
          {t('cancel')}
        </Button>

        <Button
          variant="primary"
          css={css`
            flex: 1;
            padding: ${size(4)} 0;
          `}
          onClick={onConfirm}
        >
          {t('confirm')}
        </Button>
      </Flex>
    </Flex>
  )
}

export function useRedirectModal({ redirectTo }: Args) {
  const { t } = useTranslation()

  const [modal, openModal] = useModal(
    () => <RedirectModal redirectTo={redirectTo} />,
    {
      closeLabel: t('close')
    }
  )

  return [modal, openModal] as const
}
