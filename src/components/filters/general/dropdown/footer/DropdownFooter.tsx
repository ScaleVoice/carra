import { useDropdownContext } from 'components/dropdown/Dropdown'
import { TextBodyMedium } from 'components/text/Text'
import { useTranslation } from 'react-i18next'
import { SButton, SContainer } from './DropdownFooter.styled'

type Props = {
  onApply: () => void
  onClose?: () => void
}

export function DropdownFooter({ onApply, onClose }: Props) {
  const { t } = useTranslation()
  const { setOpen } = useDropdownContext()

  const handleClose = () => {
    onClose?.()
    setOpen?.(false)
  }

  const onApplyHandler = () => {
    onApply()
    setOpen?.(false)
  }

  return (
    <SContainer>
      <SButton
        variant="outline"
        css={{ flex: 1 }}
        onClick={handleClose}
        cornerRadius="small"
      >
        <TextBodyMedium size="small" color="night-l-100">
          {t('close')}
        </TextBodyMedium>
      </SButton>
      <SButton
        variant="primary"
        css={{ flex: 2 }}
        onClick={onApplyHandler}
        cornerRadius="small"
      >
        <TextBodyMedium size="small" color="white">
          {t('filters_apply')}
        </TextBodyMedium>
      </SButton>
    </SContainer>
  )
}
