import { Flex } from 'components/Flex'
import { Header } from 'components/header/Header'
import { TableLayout } from 'components/layout/TableLayout'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useCallCustomerFilters } from 'sections/callCustomer/filters/CallCustomerTableFilters'
import { CallCustomerTable } from 'sections/callCustomer/table/CallCustomerTable'
import { TableFilters } from 'sections/filtering/TableFilters'
import { TableFiltersToolbar } from 'sections/filtering/TableFiltersToolbar'
import { initialState } from 'sections/filtering/reducer/FiltersState'
import { getIntlProps } from 'utils/i18n/getIntlProps'

export default function Calls() {
  const {
    filters,
    defaultSearch,
    onSearch,
    clear,
    openedFilters,
    toggleOpenFilters,
    activeFilters
  } = useCallCustomerFilters()

  return (
    <>
      <Head>
        <title>Ticking app | Calls</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header hasShadow />

        <TableLayout openedFilters={openedFilters}>
          <TableFilters
            filters={filters}
            openedFilters={openedFilters}
            toggleFiltersMenu={toggleOpenFilters}
          />

          <Flex variant="column">
            <TableFiltersToolbar
              initialFilters={initialState.callCustomer.filters}
              activeFilters={activeFilters}
              filters={filters}
              onClearAll={clear}
              onSearch={onSearch}
              defaultSearch={defaultSearch}
            />

            <CallCustomerTable />
          </Flex>
        </TableLayout>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ctx => {
  return {
    props: {
      ...(await getIntlProps(ctx, 'callCustomer'))
    }
  }
}
