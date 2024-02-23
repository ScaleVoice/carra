import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  sortingFns,
  useReactTable,
} from "@tanstack/react-table"
import { FC, useState } from "react"
import { LoadingSpinner } from "rtu-components"
import { CampaignListTableRows } from "./CampaignListTableRows"
import { CampaignListTableHeader } from "./Header/TableHeader"

interface Props {
  data?: any[]
  isLoading: boolean
}

export type CampaignListTableColumns = keyof any

export const CampaignListTable: FC<Props> = ({ data, isLoading }) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns: ColumnDef<any>[] = [
    {
      accessorFn: (row) => ({ id: row.campaignId, photoUrl: row.businessPhotoUrl, name: row.campaignName }),
      id: "campaignId",
      header: "",
      cell: (info) => info.getValue(),
      sortingFn: sortingFns.alphanumeric,
    },
    {
      accessorFn: (row) => row.campaignState,
      id: "campaignState",
      header: "",
      cell: (info) => info.getValue(),
      sortingFn: sortingFns.alphanumeric,
    },
    {
      accessorFn: (row) => row.reviews,
      id: "reviews",
      header: "",
      cell: (info) => info.getValue(),
      sortingFn: sortingFns.alphanumeric,
    },
    {
      accessorFn: (row) => row.registrationStartOn,
      id: "registrationStartOn",
      header: "",
      cell: (info) => info.getValue(),
      sortingFn: sortingFns.alphanumeric,
    },
    {
      accessorFn: (row) => row.testingStartOn,
      id: "testingStartOn",
      header: "",
      cell: (info) => info.getValue(),
      sortingFn: sortingFns.alphanumeric,
    },
    {
      accessorFn: (row) => row.testingEndOn,
      id: "testingEndOn",
      header: "",
      cell: (info) => info.getValue(),
      sortingFn: sortingFns.alphanumeric,
    },
  ]

  const table = useReactTable({
    data: data ?? [],
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
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  })

  return (
    <div className="mt-6 w-full rounded-xl border shadow-sm">
      <CampaignListTableHeader table={table} />
      {isLoading ? (
        <div className="flex items-center justify-center py-5">
          <LoadingSpinner color="black" className="h-8 w-8" />
        </div>
      ) : (
        <>
          {data?.length ? (
            <>
              <CampaignListTableRows table={table} />
            </>
          ) : (
            <div className="flex items-center justify-center py-5">No data</div>
          )}
        </>
      )}
    </div>
  )
}
