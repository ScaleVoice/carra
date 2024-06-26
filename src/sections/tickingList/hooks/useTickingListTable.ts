import { useTickingListData } from "@/api/useSearch"
import TableHeaderType from "@/components/Table/TableHeader/TableHeaderType"
import usePagination from "@/components/Table/TablePagination/usePagination"
import useSearch from "@/hooks/useSearch"
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { useTickingListTableColumns } from "./useTickingListColumns"

const useTickingListTable = () => {
  const { debouncedSearchValue, handleSetSearchValue, searchValue } = useSearch()
  const [totalPages, setTotalPages] = useState(0)

  const [headerType, setHeaderType] = useState<TableHeaderType>("default")
  const [totalCount, setTotalCount] = useState(0)

  const { currentPage, handleNextButtonOnClick, handlePaginationNumberOnClick, handlePrevButtonOnClick } =
    usePagination({ totalPages })

  const { data, isLoading } = useTickingListData({})

  useEffect(() => {
    if (data && !debouncedSearchValue) {
      setHeaderType("default")
      setTotalPages(data?.totalPages)
      setTotalCount(data?.totalElements)
    }
  }, [data, debouncedSearchValue])

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const { columns } = useTickingListTableColumns()

  const table = useReactTable({
    data: (data?.totalPages && debouncedSearchValue ? data?.content : data?.content) ?? [],
    manualPagination: true,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  })

  return {
    searchValue,
    handleSetSearchValue,
    totalPages,
    currentPage,
    handleNextButtonOnClick,
    handlePaginationNumberOnClick,
    handlePrevButtonOnClick,
    table,
    headerType,
    totalCount,
    isLoading,
  }
}

export default useTickingListTable
