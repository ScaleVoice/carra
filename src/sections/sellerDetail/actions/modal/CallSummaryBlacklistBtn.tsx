import { css } from '@emotion/react'
import { Flex } from 'components/Flex'
import { TextHeader } from 'components/text/Text'
import IconCircle from 'core/images/icons/IconCircle.svg'
import IconSelectedOption from 'core/images/icons/IconSelectedOption.svg'
import { color } from 'core/styles/variables'
import { useTranslation } from 'next-i18next'
import { Controller } from 'react-hook-form'
import { isNotNil } from 'utils/types'
import { SBlackListButton, SIconWrapper } from './CallSummaryModal.styled'

const getButtonStyles = (bookedAppointment: boolean | null) =>
  ({
    iconCircleColor: bookedAppointment
      ? color('night-l-200')
      : color('warning', 0.4),
    iconCheckedColor: bookedAppointment
      ? color('night-l-200')
      : color('warning'),
    buttonVariant: bookedAppointment ? 'tertiary' : 'warning-secondary',
    buttonSerializedStyles: css`
      @media (hover: hover) {
        &:hover {
          background-color: ${bookedAppointment
            ? color('night-l-700')
            : color('warning-l-100')};
        }
      }
    `
  } as const)

const renderIcon = (
  bookedAppointment: boolean | null,
  blacklisted: boolean | null
) => {
  // booked an appointment and is not blacklisted
  if (bookedAppointment && blacklisted === false) {
    return <IconSelectedOption color={color('night-l-200')} />
  }

  // did not book an appointment and is blacklisted
  if (bookedAppointment === false && blacklisted) {
    return <IconSelectedOption color={color('warning')} />
  }

  // default
  return (
    <IconCircle
      color={bookedAppointment ? color('night-l-200') : color('warning', 0.4)}
    />
  )
}

interface Props {
  bookedAppointment: boolean | null
}

export function CallSummaryBlacklistButton({ bookedAppointment }: Props) {
  const { t } = useTranslation()

  const {
    buttonVariant,
    iconCheckedColor,
    iconCircleColor,
    buttonSerializedStyles
  } = getButtonStyles(bookedAppointment)

  return (
    <Controller
      name="blacklisted"
      render={({ field: { value, onChange } }) => (
        <SBlackListButton
          variant={buttonVariant}
          onClick={() => {
            if (isNotNil(value)) {
              onChange(null)

              return
            }
            // if appointment is booked (true), then set blacklisted to false and vice versa
            onChange(!bookedAppointment)
          }}
          type="button"
          css={buttonSerializedStyles}
        >
          <SIconWrapper>{renderIcon(bookedAppointment, value)}</SIconWrapper>

          <Flex variant="column" gap={2}>
            <TextHeader variant="h6" as="h6">
              {bookedAppointment
                ? t('seller_detail_call_summary_whitelist_seller')
                : t('seller_detail_call_summary_blacklist_seller')}
            </TextHeader>

            {/* {!bookedAppointment && (
              <TextBody size="small">
                {t('seller_detail_call_summary_blacklist_seller_text')}
              </TextBody>
            )} */}
          </Flex>
        </SBlackListButton>
      )}
    />
  )
}
