import { TickingAdAction, useAdStateMutation } from 'core/api/carDetail/actions'
import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useCarDetailFormCtx } from '../CarDetail.utils'

export function useCarDetailActions() {
  const { t } = useTranslation()
  const { mutateAsync, isLoading } = useAdStateMutation()
  const form = useCarDetailFormCtx()

  const { id, state } = form.getValues()

  const handleOnActionClick = useCallback(
    async (action: TickingAdAction) => {
      try {
        const res = await mutateAsync({ id, action })

        form.reset(res)

        toast.success(t('car_detail_actions_success'))
      } catch (e) {
        toast.error(t('car_detail_actions_error'))
      }
    },
    [form, id, mutateAsync, t]
  )

  const smsOnly = useCallback(async () => {
    await handleOnActionClick('SMS_ONLY')
  }, [handleOnActionClick])

  const callYes = useCallback(async () => {
    await handleOnActionClick('CALL')
  }, [handleOnActionClick])

  const hotDeal = useCallback(async () => {
    await handleOnActionClick('HOT_DEAL')
  }, [handleOnActionClick])

  const notInterested = useCallback(async () => {
    await handleOnActionClick('NOT_INTERESTED')
  }, [handleOnActionClick])

  return {
    isLoading: isLoading,
    currentAction: state.action,
    smsOnly,
    callYes,
    hotDeal,
    notInterested
  }
}

export function isActionSelected(
  currentAction: TickingAdAction | undefined,
  action: TickingAdAction
) {
  return currentAction === action
}

export function getButtonVariant(isSelected: boolean) {
  return isSelected ? 'primary' : 'outline'
}
