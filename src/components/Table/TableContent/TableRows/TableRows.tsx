import { Table } from "@tanstack/react-table"
import TableRow from "./TableRow"

interface Props<T> {
  table: Table<T>
}

function TableRows<T>({ table }: Props<T>) {
  const isLast = (index: number) => index === table.getRowModel().rows.length - 1
  return (
    <div className="flex w-full flex-col items-center">
      {table.getRowModel().rows.map((row) => {
        return <TableRow key={row.id} row={row} isLast={isLast(row.index)} />
      })}
    </div>
  )
}

export default TableRows
