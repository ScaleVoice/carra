import { SearchInput } from "@/components/Inputs/SearchInput"
import Table from "@/components/Table"
import { NoResults } from "@/components/Table/NoResults"
import Header from "@/components/Table/TableContent/Header"
import TableRows from "@/components/Table/TableContent/TableRows/TableRows"
import { TableHeader, TableHeaderTitle } from "@/components/Table/TableHeader"
import TablePagination from "@/components/Table/TablePagination"
import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import useTickingListTable from "../hooks/useTickingListTable"
import { TickingListModal } from "../modal/TickingListModal"
import { TickingItem } from "./TickingListTable.utils"

export const TickingListTable = () => {
  const { t } = useTranslation(["tickingList", "common"])

  const {
    table,
    currentPage,
    handleNextButtonOnClick,
    handlePaginationNumberOnClick,
    handlePrevButtonOnClick,
    handleSetSearchValue,
    headerType,
    isLoading,
    searchValue,
    totalCount,
    totalPages,
  } = useTickingListTable()

  // const [modal, openModal] = useCarDetailModal()
  const [selectedItem, setSelectedItem] = useState<TickingItem | null>(null)

  const onRowClick = useCallback((item: TickingItem) => {
    setSelectedItem(item)
  }, [])

  const clearItem = useCallback(() => {
    setSelectedItem(null)
  }, [])

  return (
    <>
      <div className="flex px-10 pt-10">
        <SearchInput name="ticking-search" placeholder={t("common:header_search_placeholder")} />
      </div>

      <Table
        isLoading={isLoading}
        headerComponent={
          <TableHeader titleComponent={<TableHeaderTitle itemsCount={totalCount} title={"Filtered ads"} />} />
        }
        contentComponent={
          <>
            <Header table={table} />
            <TableRows<TickingItem> table={table} onRowClick={onRowClick} />
          </>
        }
        paginationComponent={
          <TablePagination
            className="fixed bottom-0 w-full"
            currentPage={currentPage}
            handleNextButtonOnClick={handleNextButtonOnClick}
            handlePaginationNumberOnClick={handlePaginationNumberOnClick}
            handlePrevButtonOnClick={handlePrevButtonOnClick}
            totalPages={totalPages}
          />
        }
        notFoundComponent={totalCount === 0 && <NoResults />}
      />

      <TickingListModal item={selectedItem} onClose={clearItem} />
    </>
  )
}
