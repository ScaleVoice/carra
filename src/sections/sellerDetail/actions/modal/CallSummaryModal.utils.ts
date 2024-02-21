import { CallResultBody } from 'core/api/sellerDetail/actions'
import { useTranslation } from 'next-i18next'
import { useRef } from 'react'
import { isNotNil } from 'utils/types'
import * as z from 'zod'
import { SellerDetailActionsProps } from '../SellerDetailActions.utils'

type LossReason = NonNullable<CallResultBody['lossReason']>
type Phase = CallResultBody['phase']

type Args = Pick<
  SellerDetailActionsProps,
  'lossReason' | 'phase' | 'sellerState'
>
export function useCallSummaryFormUtils({
  phase,
  lossReason,
  sellerState
}: Args) {
  const { t } = useTranslation()
  // helper object for storing default values
  const defaultValues = useRef({
    blacklisted: sellerState ? sellerState === 'BLACKLISTED' : null,
    phase,
    lossReason,
    bookedAppointment:
      phase === 'LOST' ? false : phase === 'APPOINTMENT_CREATED' ? true : null
  })

  const schema = z
    .object({
      bookedAppointment: z.boolean({
        required_error: t('seller_detail_call_summary_booked_appointment_error')
      }),
      lossReason: z
        .enum<LossReason, [LossReason, ...LossReason[]]>([
          'FAKE_AD',
          'MISLEADING_AD',
          'NO_ANSWER',
          'OLD_AD',
          'SOLD'
        ])
        .optional()
        .nullable(),
      blacklisted: z.boolean().nullable(),
      phase: z.enum<Phase, [Phase, ...Phase[]]>([
        'APPOINTMENT_CREATED',
        'BOUGHT',
        'DUPLICATE',
        'LOST',
        'NEW_AD',
        'TICKED'
      ])
    })
    .refine(
      values => {
        if (values.bookedAppointment === false) {
          return isNotNil(values.lossReason)
        }

        return true
      },

      {
        message: t('seller_detail_call_summary_booked_loss_reason_error'),
        path: ['lossReason']
      }
    )

  const bookAppointmentOptions = [
    {
      value: true,
      label: t('yes')
    },
    {
      value: false,
      label: t('no')
    }
  ]

  return { validationSchema: schema, bookAppointmentOptions, defaultValues }
}
