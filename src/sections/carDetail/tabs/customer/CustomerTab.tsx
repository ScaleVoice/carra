import { css } from '@emotion/react'
import { Flex } from 'components/Flex'
import { FormControl } from 'components/form/formControl/FormControl'
import { Spacer } from 'components/spacer/Spacer'
import { TextHeader } from 'components/text/Text'
import { size } from 'core/styles/spacing'
import { useTranslation } from 'next-i18next'
import { useCarDetailFormCtx } from '../../CarDetail.utils'
import { SCustomerFormWrapper } from './CustomerTab.styled'

export function CustomerTab() {
  const { t } = useTranslation()

  const form = useCarDetailFormCtx()

  const {
    seller: { contact }
  } = form.getValues()

  return (
    <Flex variant="column">
      <TextHeader variant="h6" as="h6">
        {t('car_detail_tabs_customer')}
      </TextHeader>

      <Spacer size={4} axis="vertical" />

      <SCustomerFormWrapper>
        <Flex variant="column" gap={4}>
          <FormControl label={t('car_detail_customer_phone')}>
            <input
              disabled
              type="text"
              value={`${contact?.phonePrefix} ${contact?.phoneNumber}`}
            />
          </FormControl>

          <FormControl label={t('car_detail_customer_seller')}>
            <textarea
              disabled
              {...form.register('seller.name')}
              css={css`
                max-height: ${size(36)};
              `}
            />
          </FormControl>
        </Flex>

        <Flex variant="column" gap={4}>
          <FormControl label={t('car_detail_customer_type')}>
            <input disabled type="text" {...form.register('seller.type')} />
          </FormControl>
        </Flex>
      </SCustomerFormWrapper>
    </Flex>
  )
}
