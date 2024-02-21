import { css } from '@emotion/react'
import { Flex } from 'components/Flex'
import { TextBodyMedium } from 'components/text/Text'
import IconDoubleChevronLeft from 'core/images/icons/IconDoubleChevronLeft.svg'
import { size } from 'core/styles/spacing'
import { color } from 'core/styles/variables'
import { useTranslation } from 'next-i18next'

export function ScrollForMore() {
  const { t } = useTranslation()

  return (
    <Flex variant="row" justify="center" align="center">
      <IconDoubleChevronLeft
        css={css`
          rotate: -90deg;
          margin-right: ${size(1)};
        `}
        color={color('night-l-100')}
      />

      <TextBodyMedium size="small" color="night-l-100">
        {t('scroll_for_more')}
      </TextBodyMedium>
    </Flex>
  )
}
