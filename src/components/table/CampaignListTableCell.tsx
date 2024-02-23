import { Cell, flexRender } from "@tanstack/react-table"
import { FC } from "react"

interface Props {
  cell: Cell<any, any>
}

export const CampaignListTableCell: FC<Props> = ({ cell }) => {
  const value = cell.getValue()
  const cellData = cell.id.split("_")
  const column = cellData[1] as any
  let Component = flexRender(cell.column.columnDef.cell, cell.getContext())

  return (
    <div key={cell.id} className={`h-14 flex-1 items-center justify-center px-2 py-3 text-center`}>
      {Component}
    </div>
  )
}
