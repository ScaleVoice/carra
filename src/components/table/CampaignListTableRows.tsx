import { Row, Table } from "@tanstack/react-table"
import { FC } from "react"
import { CampaignListTableCell } from "./CampaignListTableCell"

interface Props {
  table: Table<any>
}

export const CampaignListTableRows: FC<Props> = ({ table }) => {
  return (
    <div className="flex w-full flex-col items-center ">
      {table.getRowModel().rows.map((row) => {
        return <TableRow key={row.id} row={row} />
      })}
    </div>
  )
}

interface RowProps {
  row: Row<any>
}

const TableRow: FC<RowProps> = ({ row }) => {
  return (
    <div
      key={row.id}
      className="flex w-full cursor-pointer justify-between border border-t-0  border-gray-200 text-gray"
    >
      {row.getVisibleCells().map((cell) => (
        <CampaignListTableCell key={cell.id} cell={cell} />
      ))}
    </div>
  )
}
