import { TickingItem } from "@/api/useSearch"
import { SortDirection } from "@tanstack/react-table"
import { produce } from "immer"
import { TickingFilters } from "./Filters.utils"
import { State, initialState } from "./FiltersState"

export type Action =
  | {
      type: "SET_MODULE_FILTERS"
      payload: {
        module: keyof State
        filters: Partial<TickingFilters>
      }
    }
  | {
      type: "RESET_MODULE_FILTERS"
      payload: {
        module: keyof State
      }
    }
  | {
      type: "SET_MODULE_SORTING"
      payload: {
        module: keyof State
        sorting: Partial<Record<keyof TickingItem, SortDirection | null>>
      }
    }
  | {
      type: "RESET_MODULE_SORTING"
      payload: {
        module: keyof State
      }
    }
  | {
      type: "TOGGLE_MODULE_FILTERS"
      payload: {
        module: keyof State
      }
    }

export type Dispatch = (action: Action) => void

export const filtersReducer = produce((state: State, action: Action) => {
  switch (action.type) {
    case "SET_MODULE_FILTERS":
      state[action.payload.module].filters = {
        ...state[action.payload.module].filters,
        ...action.payload.filters,
      }
      break

    case "RESET_MODULE_FILTERS":
      state[action.payload.module].filters = initialState[action.payload.module].filters
      break

    case "SET_MODULE_SORTING":
      state[action.payload.module].sorting = action.payload.sorting
      break

    case "RESET_MODULE_SORTING": {
      state[action.payload.module].sorting = initialState[action.payload.module].sorting
      break
    }

    case "TOGGLE_MODULE_FILTERS":
      state[action.payload.module].isFilterMenuOpened = !state[action.payload.module].isFilterMenuOpened
      break

    default:
      return initialState
  }
})
