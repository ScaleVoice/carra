import { Table, flexRender } from "@tanstack/react-table"
import { Fragment } from "react"
import { twMerge } from "tailwind-merge"

interface Props<T> {
  table: Table<T>
}

function Header<T>({ table }: Props<T>) {
  return (
    <>
      {table.getHeaderGroups().map((headerGroup) => {
        return (
          <div
            key={headerGroup.id}
            className={twMerge("flex rounded-t-lg border-x border-t border-gray-50 bg-gray-25 text-gray")}
          >
            {headerGroup.headers.map((header) => (
              <Fragment key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</Fragment>
            ))}
          </div>
        )
      })}
    </>
  )
}

export default Header
