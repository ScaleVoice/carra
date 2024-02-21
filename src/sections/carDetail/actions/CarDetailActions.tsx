import { useTranslation } from 'next-i18next'
import { TickingAdActionButton } from './CarDetailActionButton'
import { SActionsWrapper } from './CarDetailActions.styled'
import { isActionSelected, useCarDetailActions } from './CarDetailActions.utils'

export function CarDetailActions() {
  const { t } = useTranslation()

  const { smsOnly, callYes, hotDeal, isLoading, currentAction, notInterested } =
    useCarDetailActions()

  return (
    <SActionsWrapper>
      <TickingAdActionButton
        isSelected={isActionSelected(currentAction, 'NOT_INTERESTED')}
        onClick={notInterested}
        text={t('car_detail_actions_not_interested')}
        loading={isLoading}
      />
      <TickingAdActionButton
        isSelected={isActionSelected(currentAction, 'SMS_ONLY')}
        onClick={smsOnly}
        text={t('car_detail_actions_sms_only')}
        loading={isLoading}
      />
      <TickingAdActionButton
        isSelected={isActionSelected(currentAction, 'CALL')}
        onClick={callYes}
        text={t('car_detail_actions_call_yes')}
        loading={isLoading}
      />
      <TickingAdActionButton
        isSelected={isActionSelected(currentAction, 'HOT_DEAL')}
        onClick={hotDeal}
        text={t('car_detail_actions_hot_deal')}
        loading={isLoading}
      />
    </SActionsWrapper>
  )
}
