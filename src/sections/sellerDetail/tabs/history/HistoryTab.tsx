import { css } from '@emotion/react'
import { Flex } from 'components/Flex'
import { Spacer } from 'components/spacer/Spacer'
import { Table } from 'components/table/Table'
import { TableFooter } from 'components/table/footer/TableFooter'
import { Loader } from 'components/table/loading/Loader'
import { NoResults } from 'components/table/loading/NoResults'
import { TextHeader } from 'components/text/Text'
import { size } from 'core/styles/spacing'
import { useTranslation } from 'next-i18next'
import {
  useSellerDetailFormCtx,
  useSellerHistoryAds
} from 'sections/sellerDetail/SellerDetail.utils'
import { useHistoryTabColumns } from './HistoryTab.utils'

export function HistoryTab() {
  const { t } = useTranslation()

  const form = useSellerDetailFormCtx()

  const { seller } = form.getValues()

  const historyTabColumns = useHistoryTabColumns()

  const { mappedData, loading, page, setPage, totalPages } =
    useSellerHistoryAds(seller.id)

  if (loading) {
    return <Loader />
  }

  if (!mappedData.length) {
    return <NoResults text={t('seller_detail_tabs_no_results')} hint={false} />
  }

  return (
    <Flex variant="column">
      <TextHeader variant="h6" as="h6">
        {t('seller_detail_tabs_history')}
      </TextHeader>

      <Spacer size={5} axis="vertical" />

      <Table
        withoutScrollIndicator
        columns={historyTabColumns}
        data={mappedData}
        withoutHeader
        leftPadding={0}
        containerStyles={css`
          height: calc(100vh - ${size(105)});
        `}
      />

      <TableFooter
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        css={css`
          padding: ${size(4)} ${size(0)};
        `}
      />
    </Flex>
  )
}
