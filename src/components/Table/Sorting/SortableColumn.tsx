import { CellContext, ColumnDef, ColumnDefTemplate, RowData, SortDirection } from "@tanstack/react-table"

import { Text } from "@/components/Text"
import { useFiltersContext } from "@/sections/filtering/reducer/FiltersContext"
import { State } from "@/sections/filtering/reducer/FiltersState"
import { DeepKey } from "@/types"
import { ReactNode } from "react"
import { GRAY, PRIMARY } from "tailwind.config"
import SortingIndicator from "../TableContent/Header/SortingIndicator"

interface CreateColumnArgs<T extends RowData, Value extends unknown> {
  cell: ColumnDefTemplate<CellContext<T, Value>>
  label: ReactNode
  size?: number
  minSize?: number
  maxSize?: number
}

const SORTING_ACTIVE_ICON_COLOR = PRIMARY[500]
const DEFAULT_ICON_COLOR = GRAY[400]

export function useSortableColumns<T extends RowData>(module: keyof State) {
  const { state, dispatch } = useFiltersContext()

  const onHeaderClick = (id: string, currentSorting: SortDirection) => {
    const isASC = currentSorting === "asc"
    const isDESC = currentSorting === "desc"

    dispatch({
      type: "SET_MODULE_SORTING",
      payload: {
        module,
        sorting: {
          [id]: isASC ? "desc" : isDESC ? null : "asc",
        },
      },
    })
  }

  const createSortableColumn = <P extends string>(
    id: P,
    { cell, label, size, minSize, maxSize }: CreateColumnArgs<T, DeepKey<T, P>>,
  ): ColumnDef<T, DeepKey<T, P>> => {
    const currentSorting = state[module].sorting?.[id] as SortDirection

    const header = () => (
      <button
        onClick={() => onHeaderClick(id, currentSorting)}
        className="flex flex-1 cursor-pointer px-6 py-4 text-left"
      >
        <div className="flex items-center gap-1">
          <Text size="sm" className="text-gray-600">
            {label}
          </Text>

          <SortingIndicator sorting={currentSorting} />
        </div>
      </button>
    )

    return {
      accessorKey: id,
      header,
      cell,
      size,
      minSize,
      maxSize,
    }
  }

  return {
    createSortableColumn,
  }
}
