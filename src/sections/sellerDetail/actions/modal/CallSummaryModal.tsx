import { css } from '@emotion/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from 'components/Flex'
import { Button } from 'components/button/Button'
import { InputSwitch } from 'components/inputSwitch/InputSwitch'
import { useModal } from 'components/modal/Modal'
import { useCloseModalContext } from 'components/modal/Modal.utils'
import { Select } from 'components/select/Select'
import { Spacer } from 'components/spacer/Spacer'
import { TextBody, TextHeader } from 'components/text/Text'
import {
  CallResultBody,
  useCallResultUpdate,
  useSellerStateMutation
} from 'core/api/sellerDetail/actions'
import { useLossReasons } from 'core/api/sellerDetail/lossReasons'
import { size } from 'core/styles/spacing'
import { zIndex } from 'core/styles/variables'
import equal from 'fast-deep-equal'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { Dispatch, SetStateAction } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { isNil, nameOf } from 'utils/types'
import { SellerDetailActionsProps } from '../SellerDetailActions.utils'
import { CallSummaryBlacklistButton } from './CallSummaryBlacklistBtn'
import { useCallSummaryFormUtils } from './CallSummaryModal.utils'

interface CallSummaryValues extends CallResultBody {
  blacklisted: boolean | null
  bookedAppointment: boolean | null
}

type SummaryModalProps = SellerDetailActionsProps & {
  setIsCalling: Dispatch<SetStateAction<boolean>>
}

const animationVariants = {
  initial: {
    height: 0,
    opacity: 0
  },
  didNotBook: {
    height: size(64),
    opacity: 1
  },
  booked: {
    height: size(30),
    opacity: 1
  }
}

function CallSummaryModal({
  sellerId,
  tickingAdId,
  sellerState,
  phase,
  lossReason,
  setIsCalling,
  resetSellerDetailForm
}: SummaryModalProps) {
  const { t } = useTranslation()

  const close = useCloseModalContext()

  const { validationSchema, bookAppointmentOptions, defaultValues } =
    useCallSummaryFormUtils({
      sellerState,
      phase,
      lossReason
    })

  const form = useForm<CallSummaryValues>({
    defaultValues: defaultValues.current,
    mode: 'all',
    resolver: zodResolver(validationSchema)
  })

  const lossReasons = useLossReasons()

  const sellerStateMutation = useSellerStateMutation()
  const resultUpdateMutation = useCallResultUpdate()

  const bookedAppointment = form.watch('bookedAppointment')

  const onSubmit = async (data: CallSummaryValues) => {
    try {
      // if current form value is not same as default value, call api
      if (!equal(defaultValues.current.blacklisted, data.blacklisted)) {
        const response = await sellerStateMutation.mutateAsync({
          tickingAdId,
          sellerId,
          state: data.blacklisted ? 'BLACKLISTED' : 'WHITELISTED'
        })

        resetSellerDetailForm(response)

        toast.success(t('seller_detail_update_seller_state_success'))
      }
    } catch (e) {
      toast.error(t('seller_detail_update_seller_state_error'))
    }

    try {
      // if current form value is not same as default value, call api
      if (
        !equal(defaultValues.current.bookedAppointment, data.bookedAppointment)
      ) {
        const requestBody: CallResultBody =
          data.bookedAppointment === false
            ? { phase: 'LOST', lossReason: data.lossReason }
            : { phase: 'APPOINTMENT_CREATED' }

        const response = await resultUpdateMutation.mutateAsync({
          tickingAdId,
          body: requestBody
        })

        resetSellerDetailForm(response)

        toast.success(t('seller_detail_update_seller_call_result_success'))
      }
    } catch (e) {
      toast.error(t('seller_detail_update_seller_call_result_error'))
    }

    setIsCalling?.(false)
    close()
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Flex variant="column">
          <TextHeader variant="h3" as="h3">
            {t('seller_detail_call_summary_modal_title')}
          </TextHeader>

          <Spacer size={4} axis="vertical" />

          <TextBody>
            {t('seller_detail_call_summary_modal_subheading')}
          </TextBody>

          <Spacer size={10} axis="vertical" />

          <TextHeader variant="h6" as="h6">
            {t('seller_detail_call_summary_modal_question_1')}
          </TextHeader>

          <Spacer size={4} axis="vertical" />

          <Controller
            name={nameOf<CallSummaryValues>('bookedAppointment')}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <InputSwitch
                value={value}
                error={error?.message}
                onChange={value => {
                  onChange(value)
                }}
                options={bookAppointmentOptions}
              />
            )}
          />

          <motion.div
            variants={animationVariants}
            initial="initial"
            animate={
              bookedAppointment === null
                ? 'initial'
                : !!bookedAppointment
                ? 'booked'
                : 'didNotBook'
            }
          >
            {bookedAppointment === false && (
              <>
                <Spacer size={10} axis="vertical" />

                <TextHeader variant="h6" as="h6">
                  {t('seller_detail_call_summary_modal_question_2')}
                </TextHeader>

                <Spacer size={4} axis="vertical" />

                <Select
                  name={nameOf<CallSummaryValues>('lossReason')}
                  emptyLabel={t('single_select_empty_label')}
                  options={lossReasons}
                />
              </>
            )}

            <Spacer size={10} axis="vertical" />

            <CallSummaryBlacklistButton bookedAppointment={bookedAppointment} />
          </motion.div>

          <Spacer size={10} axis="vertical" />

          <Flex variant="row" gap={4}>
            <Button
              type="button"
              variant="outline"
              onClick={close}
              css={css`
                flex: 1;
                padding: 14px 0;
              `}
            >
              {t('cancel')}
            </Button>
            <Button
              type="submit"
              variant="primary"
              css={css`
                flex: 1;
                padding: 14px 0;
              `}
              disabled={isNil(bookedAppointment)}
            >
              {t('confirm')}
            </Button>
          </Flex>
        </Flex>
      </form>
    </FormProvider>
  )
}

export function useCallSummaryModal(args: SummaryModalProps) {
  const { t } = useTranslation()

  const [modal, openModal] = useModal(() => <CallSummaryModal {...args} />, {
    closeLabel: t('close'),
    wrapperStyles: css`
      overflow-y: hidden;
      width: ${size(138)};
      z-index: ${zIndex('top')};
    `,
    backgroundStyles: css`
      z-index: ${zIndex('over-top')};
    `
  })

  return [modal, openModal] as const
}
