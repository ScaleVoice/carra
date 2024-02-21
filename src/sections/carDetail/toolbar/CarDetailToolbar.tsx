import { css } from '@emotion/react'
import { Flex } from 'components/Flex'
import { useCloseModalContext } from 'components/modal/Modal.utils'
import { TextBody, TextHeader } from 'components/text/Text'
import IconCross from 'core/images/icons/IconCross.svg'
import { fadeIn } from 'core/styles/animations'
import { size } from 'core/styles/spacing'
import { time } from 'core/styles/variables'
import { format } from 'date-fns'
import { useTranslation } from 'next-i18next'
import { useCarDetailFormCtx } from '../CarDetail.utils'
import { SToolbarButton, SToolbarIconButton } from './CarDetailToolbar.styled'

interface Props {
  id: string
  downloadedAt?: string
  pricingAppUrl?: string
}

export function CarDetailToolbar({ id, downloadedAt, pricingAppUrl }: Props) {
  const { t } = useTranslation()
  const close = useCloseModalContext()
  const { formState } = useCarDetailFormCtx()

  const handleOpenPricingApp = () => {
    const hasProtocol = pricingAppUrl?.includes('http')

    window.open(
      hasProtocol ? pricingAppUrl : `https://${pricingAppUrl}`,
      '_blank'
    )
  }

  return (
    <Flex variant="row" justify="between">
      <Flex variant="column">
        <TextHeader variant="h5" as="h5">
          {id}
        </TextHeader>

        {downloadedAt && (
          <TextBody size="small">
            {format(Date.parse(downloadedAt), 'dd/MM/yyyy HH:mm')}
          </TextBody>
        )}
      </Flex>

      <Flex variant="row" gap={2}>
        {formState.isDirty && (
          <SToolbarButton
            variant="primary"
            type="submit"
            css={css`
              animation: ${fadeIn} ${time('control')} ease-in-out;
            `}
          >
            {t('save')}
          </SToolbarButton>
        )}

        {pricingAppUrl && (
          <SToolbarButton variant="secondary" onClick={handleOpenPricingApp}>
            {t('pricing_app_button')}
          </SToolbarButton>
        )}

        <SToolbarIconButton variant="tertiary" onClick={close}>
          <IconCross
            css={css`
              width: ${size(5)};
              height: ${size(5)};
            `}
          />
        </SToolbarIconButton>
      </Flex>
    </Flex>
  )
}
