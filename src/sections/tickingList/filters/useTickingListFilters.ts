import { TickingFilters } from "@/sections/filtering/reducer/Filters.utils"
import { useFiltersContext } from "@/sections/filtering/reducer/FiltersContext"
import { useCallback } from "react"

export function useTickingListFilters() {
  const {
    state: { tickingList },
    dispatch,
  } = useFiltersContext()

  const onSearch = useCallback(
    (fullText: string | undefined) => {
      dispatch({
        type: "SET_MODULE_FILTERS",
        payload: {
          module: "tickingList",
          filters: {
            fullText,
          },
        },
      })
    },
    [dispatch],
  )

  const setFilter = useCallback(
    (filters: Partial<TickingFilters>) => {
      dispatch({
        type: "SET_MODULE_FILTERS",
        payload: {
          module: "tickingList",
          filters,
        },
      })
    },
    [dispatch],
  )

  const toggleSidebar = useCallback(() => {
    dispatch({
      type: "TOGGLE_MODULE_FILTERS",
      payload: {
        module: "tickingList",
      },
    })
  }, [dispatch])

  const clear = useCallback(() => {
    dispatch({
      type: "RESET_MODULE_FILTERS",
      payload: {
        module: "tickingList",
      },
    })
  }, [dispatch])

  return {
    query: tickingList.filters.fullText,
    onSearch,
    clear,
    isFilterMenuOpened: tickingList.isFilterMenuOpened,
    toggleSidebar,
    activeFilters: tickingList.filters,
    setFilter,
  }
}

export function getActiveFilterList(filters: Partial<TickingFilters>) {
  const result = Object.entries(filters).reduce((acc, [key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      const items = value.map((item) => ({ key, value: item }))
      return [...acc, ...items]
    }
    if (typeof value === "string" && value.length > 0) {
      return [...acc, { key, value }]
    }

    if (typeof value === "number") {
      return [...acc, { key, value }]
    }

    return acc
  }, [])

  return result as { key: keyof TickingFilters; value: string | number }[]
}
