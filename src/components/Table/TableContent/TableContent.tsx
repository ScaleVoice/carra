import { Table } from "@tanstack/react-table"
import Header from "./Header"
import TableRows from "./TableRows/TableRows"

interface Props<T> {
  table: Table<T>
}
function TableContent<T>({ table }: Props<T>) {
  return (
    <div className="mt-32 p-10">
      <Header table={table} />
      <TableRows table={table} />
    </div>
  )
}

export default TableContent
