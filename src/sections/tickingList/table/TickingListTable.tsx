import { css } from '@emotion/react'
import { Flex } from 'components/Flex'
import { Table } from 'components/table/Table'
import { TableFooter } from 'components/table/footer/TableFooter'
import { TableHeader } from 'components/table/header/TableHeader'
import { Loader } from 'components/table/loading/Loader'
import { NoResults } from 'components/table/loading/NoResults'
import { size } from 'core/styles/spacing'
import { useTranslation } from 'next-i18next'
import { useCarDetailModal } from '../../carDetail/CarDetail.utils'
import { useTickingListTable } from './TickingListTable.utils'

export const TickingListTable = () => {
  const { t } = useTranslation(['tickingList', 'common'])

  const { columns, query, page, setPage, isLoading, openedFilters } =
    useTickingListTable()

  const [modal, openModal] = useCarDetailModal()

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
          results={query.data?.totalElements ?? 0}
          tableName={t('tickingList:table_title')}
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
          totalPages={query.data.totalPages}
          setPage={setPage}
        />
      </Flex>
      {modal}
    </>
  )
}
