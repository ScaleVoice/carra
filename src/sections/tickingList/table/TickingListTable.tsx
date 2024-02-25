import Table from "@/components/Table"
import TableContent from "@/components/Table/TableContent"
import TablePagination from "@/components/Table/TablePagination"
import { useTranslation } from "react-i18next"
import useTickingListTable from "../hooks/useTickingListTable"

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

  if (isLoading) {
    // return <Loader />
    return null
  }

  // if (!query.data.content.length) {
  //   // return <NoResults />
  //   return null
  // }

  return (
    <Table
      headerComponent={null}
      contentComponent={<TableContent table={table} />}
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
      notFoundComponent={
        // !isLoading && totalCount === 0 ? (
        //   <NotFound
        //     translations={{ title: t("customer"), itemsString: t("customers") }}
        //     searchValue={searchValue}
        //     onClearFilters={() => handleSetSearchValue("")}
        //   />
        // ) : null
        null
      }
    />
  )
}
