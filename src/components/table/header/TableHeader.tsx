import { Table, flexRender } from "@tanstack/react-table"
import { FC } from "react"
import { SortingIndicator } from "./SortingIndicator"

interface Props {
  table: Table<any>
}

export const CampaignListTableHeader: FC<Props> = ({ table }) => {
  return (
    <>
      {table.getHeaderGroups().map((headerGroup) => (
        <div key={headerGroup.id} className="flex justify-between rounded-t-xl border bg-gray-50">
          {headerGroup.headers.map((header) => {
            const sorting = header.column.getIsSorted()

            return (
              <div key={header.id} className="flex-1">
                {header.isPlaceholder ? null : (
                  <>
                    <div
                      className={`min-h[48px] flex items-center justify-center gap-1 px-6 py-3 ${
                        header.column.getCanSort() ? "cursor-pointer select-none" : ""
                      }`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <SortingIndicator sorting={sorting} />
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </>
  )
}
