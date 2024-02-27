import { Row, flexRender } from "@tanstack/react-table"
import { twMerge } from "tailwind-merge"

interface Props<T> {
  row: Row<T>
  isLast: boolean
  onRowClick?: (item: T) => void
}

function TableRow<T>({ row, isLast, onRowClick }: Props<T>) {
  return (
    <div
      key={row.id}
      className={twMerge(
        "flex w-full border border-t-0 border-gray-50 text-gray hover:bg-primary-25",
        isLast && "rounded-b-lg",
        onRowClick && "cursor-pointer",
      )}
      onClick={() => onRowClick?.(row.original)}
    >
      {row.getVisibleCells().map((cell) => (
        <div key={cell.id} className="flex-1 px-6 py-4">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
      ))}
    </div>
  )
}

export default TableRow
