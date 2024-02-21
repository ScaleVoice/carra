import {
  CellContext,
  ColumnDef,
  ColumnDefTemplate,
  RowData
} from '@tanstack/react-table'
import { Flex } from 'components/Flex'
import { Spacer } from 'components/spacer/Spacer'
import { TextBodyMedium } from 'components/text/Text'
import IconDropDown from 'core/images/icons/IconArrowDropDown.svg'
import IconDropUp from 'core/images/icons/IconArrowDropUp.svg'
import { color } from 'core/styles/variables'
import { ReactNode } from 'react'
import { SortType } from 'sections/filtering/reducer/Filters.utils'
import { useFiltersContext } from 'sections/filtering/reducer/FiltersContext'
import { State } from 'sections/filtering/reducer/FiltersState'
import { DeepKey } from 'utils/types'
import { SSortHeader } from './SortableColumn.styled'

interface CreateColumnArgs<T extends RowData, Value extends unknown> {
  cell: ColumnDefTemplate<CellContext<T, Value>>
  label: ReactNode
  size?: number
  minSize?: number
  maxSize?: number
}

const SORTING_ACTIVE_ICON_COLOR = color('night-l-100')
const DEFAULT_ICON_COLOR = color('night-l-650')

export function useSortableColumns<T extends RowData>(module: keyof State) {
  const { state, dispatch } = useFiltersContext()

  const onHeaderClick = (id: string, currentSorting: SortType) => {
    const isASC = currentSorting === 'asc'
    const isDESC = currentSorting === 'desc'

    dispatch({
      type: 'SET_MODULE_SORTING',
      payload: {
        module,
        sorting: {
          [id]: isASC ? 'desc' : isDESC ? 'none' : 'asc'
        }
      }
    })
  }

  const createSortableColumn = <P extends string>(
    id: P,
    { cell, label, size, minSize, maxSize }: CreateColumnArgs<T, DeepKey<T, P>>
  ): ColumnDef<T, DeepKey<T, P>> => {
    const currentSorting = state[module].sorting?.[id] as SortType

    const header = () => (
      <SSortHeader onClick={() => onHeaderClick(id, currentSorting)}>
        <Flex variant="row" align="center">
          <TextBodyMedium size="small" color="night-l-100">
            {label}
          </TextBodyMedium>

          <Spacer size={2} axis="horizontal" />

          <Flex variant="column">
            <IconDropUp
              color={
                currentSorting === 'asc'
                  ? SORTING_ACTIVE_ICON_COLOR
                  : DEFAULT_ICON_COLOR
              }
              width={8}
              height={5}
            />
            <IconDropDown
              color={
                currentSorting === 'desc'
                  ? SORTING_ACTIVE_ICON_COLOR
                  : DEFAULT_ICON_COLOR
              }
              width={8}
              height={5}
            />
          </Flex>
        </Flex>
      </SSortHeader>
    )

    return {
      accessorKey: id,
      header,
      cell,
      size,
      minSize,
      maxSize
    }
  }

  return {
    createSortableColumn
  }
}
