import { useTranslation } from 'react-i18next'
import { CallResultBody } from './actions'

export type LossReasonOption = {
  value: NonNullable<CallResultBody['lossReason']>
  label: string
}

export function useLossReasons(): LossReasonOption[] {
  const { t } = useTranslation()

  return [
    { value: 'NO_ANSWER', label: t('appointment_loss_reason_NO_ANSWER') },
    {
      value: 'MISLEADING_AD',
      label: t('appointment_loss_reason_MISLEADING_AD')
    },
    {
      value: 'OLD_AD',
      label: t('appointment_loss_reason_OLD_AD')
    },
    {
      value: 'FAKE_AD',
      label: t('appointment_loss_reason_FAKE_AD')
    },
    {
      value: 'SOLD',
      label: t('appointment_loss_reason_SOLD')
    }
  ]
}
