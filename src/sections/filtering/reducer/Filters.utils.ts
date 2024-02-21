import { paths } from 'core/api/generated/ticking'
import { TickingItem } from 'sections/tickingList/table/TickingListTable.utils'
import { omitNilValues } from 'utils/object'
import { State } from './FiltersState'

type TickingAdsSearchBody =
  paths['/ticking/ticking-app/ticking-ads/search']['post']['requestBody']['content']['application/json']

export type TickingFilters = Omit<TickingAdsSearchBody, 'excludeWitStateAction'>

export type FilterWithPagination<T> = T & { page: number }

export type SortType = 'asc' | 'desc' | 'none'

export type Sorting = Record<
  keyof State,
  Partial<Record<keyof TickingItem, SortType>>
>

// filters out sort 'none' sortings
function isSorting(sort: SortType): sort is 'asc' | 'desc' {
  return sort === 'asc' || sort === 'desc'
}

export function createSortArray(
  sort?: Partial<Record<keyof TickingItem, SortType>>
) {
  if (!sort) {
    return []
  }

  const sortArray = Object.entries(omitNilValues(sort))
    .filter(([_, value]) => isSorting(value))
    .map(([key, value]) => [key, value].join(','))

  return !!sortArray.length ? sortArray : undefined
}
