import { css } from '@emotion/react'
import { Flex } from 'components/Flex'
import { FormControl } from 'components/form/formControl/FormControl'
import { Spacer } from 'components/spacer/Spacer'
import { Table } from 'components/table/Table'
import { TableFooter } from 'components/table/footer/TableFooter'
import { Loader } from 'components/table/loading/Loader'
import { TextHeader } from 'components/text/Text'
import { size } from 'core/styles/spacing'
import { useTranslation } from 'next-i18next'
import {
  useSellerCurrentAds,
  useSellerDetailFormCtx
} from 'sections/sellerDetail/SellerDetail.utils'
import { SSellerFormWrapper } from './SellerTab.styled'
import { useSellerTabColumns } from './SellerTab.utils'

export function SellerTab() {
  const { t } = useTranslation()

  const form = useSellerDetailFormCtx()
  const {
    seller: { contact, id: sellerId, type }
  } = form.getValues()

  const sellerColumns = useSellerTabColumns()
  const { mappedData, loading, page, setPage, totalPages } =
    useSellerCurrentAds(sellerId)

  const phoneNumber =
    !!contact?.phonePrefix && !!contact.phoneNumber
      ? [contact.phonePrefix, contact.phoneNumber].join(' ')
      : t('nil_value')

  const sellerType = type ?? t('nil_value')

  return (
    <Flex variant="column">
      <TextHeader variant="h6" as="h6">
        {t('seller_detail_tabs_seller')}
      </TextHeader>

      <Spacer size={4} axis="vertical" />

      <SSellerFormWrapper>
        <FormControl
          label={t('car_detail_customer_seller')}
          css={css`
            grid-column: 1/-1;
          `}
        >
          <input disabled type="text" {...form.register('seller.name')} />
        </FormControl>

        <Flex variant="column" gap={4}>
          <FormControl label={t('car_detail_customer_phone')}>
            <input disabled type="text" value={phoneNumber} />
          </FormControl>
        </Flex>
        <Flex variant="column" gap={4}>
          <FormControl label={t('car_detail_customer_type')}>
            <input disabled type="text" value={sellerType} />
          </FormControl>
        </Flex>
      </SSellerFormWrapper>

      <Spacer size={10} axis="vertical" />

      <TextHeader variant="h6" as="h6">
        {t('seller_detail_current_advertisements')}
      </TextHeader>

      <Spacer size={5} axis="vertical" />

      {loading ? (
        <Loader />
      ) : (
        <>
          <Table
            columns={sellerColumns}
            data={mappedData}
            withoutHeader
            leftPadding={0}
            containerStyles={css`
              height: calc(100vh - ${size(158)});
            `}
            withoutScrollIndicator
          />

          <TableFooter
            page={page}
            totalPages={totalPages}
            setPage={setPage}
            css={css`
              padding: ${size(4)} ${size(0)};
            `}
          />
        </>
      )}
    </Flex>
  )
}
