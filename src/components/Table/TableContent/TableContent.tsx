import { Table } from "@tanstack/react-table"
import Header from "./Header"
import TableRows from "./TableRows/TableRows"

interface Props<T> {
  table: Table<T>
}
function TableContent<T>({ table }: Props<T>) {
  return (
    <>
      <Header table={table} />
      <TableRows table={table} />
    </>
  )
}

export default TableContent
