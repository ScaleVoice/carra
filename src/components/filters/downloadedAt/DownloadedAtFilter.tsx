import { css } from '@emotion/react'
import { Flex } from 'components/Flex'
import { Button } from 'components/button/Button'
import { DatePicker } from 'components/datepicker/Datepicker'
import { Spacer } from 'components/spacer/Spacer'
import { TextBody } from 'components/text/Text'
import { size } from 'core/styles/spacing'
import { radius } from 'core/styles/variables'
import { useTranslation } from 'next-i18next'

interface Props {
  from?: string | null
  to?: string | null
  onFromChange: (from: string | null) => void
  onToChange: (to: string | null) => void
  onLastHourClick: () => void
}

export function DownloadedAtFilter({
  from = null,
  to = null,
  onFromChange,
  onToChange,
  onLastHourClick
}: Props) {
  const { t } = useTranslation()

  return (
    <Flex variant="column">
      <Spacer size={1} axis="vertical" />

      <TextBody>Downloaded at</TextBody>
      <Spacer size={1} axis="vertical" />

      <DatePicker
        onChange={onFromChange}
        value={from}
        placeholder={t('from')}
        maxDate={to ? new Date(to) : new Date()}
        showTimeInput
      />

      <Spacer size={3} axis="vertical" />

      <DatePicker
        onChange={onToChange}
        value={to}
        placeholder={t('to')}
        minDate={from ? new Date(from) : undefined}
        showTimeInput
        maxDate={new Date()}
      />

      <Spacer size={2} axis="vertical" />

      <Button
        variant="primary"
        onClick={onLastHourClick}
        css={css`
          padding: ${size(1)} 0;
          border-radius: ${radius('input')};
        `}
      >
        {t('filters_downloaded_at_last_hour')}
      </Button>

      <Spacer size={1} axis="vertical" />
    </Flex>
  )
}
