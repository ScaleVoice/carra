import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import { omitNilValues } from 'utils/object'
import { Maybe } from '../../utils/types'
import { FilterWithPagination, TickingFilters } from './reducer/Filters.utils'

export function useSearch(value: Maybe<string>) {
  const [search, setSearch] = useState(value || '')
  const [debouncedSearch, setDebouncedSearch] = useState(search)

  useEffect(() => {
    setSearch(value ?? '')
  }, [value])

  useDebounce(
    () => {
      setDebouncedSearch(search)
    },
    500,
    [search]
  )

  return {
    debouncedSearch,
    search,
    setSearch
  }
}

export function getSanitizedFiltersWithoutPage(
  filters: FilterWithPagination<Partial<TickingFilters>>
) {
  return omitNilValues({ ...filters, page: undefined })
}
