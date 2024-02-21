import { css } from '@emotion/react'
import { Flex } from 'components/Flex'
import { Table } from 'components/table/Table'
import { TableFooter } from 'components/table/footer/TableFooter'
import { TableHeader } from 'components/table/header/TableHeader'
import { Loader } from 'components/table/loading/Loader'
import { NoResults } from 'components/table/loading/NoResults'
import { size } from 'core/styles/spacing'
import { useTranslation } from 'next-i18next'
import { useCustomerDetailModal } from 'sections/sellerDetail/SellerDetail.utils'
import { useCallCustomerTable } from './CallCustomerTable.utils'

export const CallCustomerTable = () => {
  const { t } = useTranslation(['callCustomer', 'common'])

  const { query, page, setPage, isLoading, columns, openedFilters } =
    useCallCustomerTable()

  const [modal, openModal] = useCustomerDetailModal()

  if (isLoading) {
    return <Loader />
  }

  if (!query.data.content.length) {
    return <NoResults />
  }

  return (
    <>
      <Flex variant="column">
        <TableHeader
          results={query.data.totalElements}
          tableName={t('callCustomer:table_title')}
        />

        <Table
          openedFilters={openedFilters}
          columns={columns}
          data={query.data.content}
          onRowClick={openModal}
          containerStyles={css`
            height: calc(100vh - ${size(82)});
          `}
        />

        <TableFooter
          page={page}
          setPage={setPage}
          totalPages={query.data.totalPages}
        />
      </Flex>
      {modal}
    </>
  )
}
