import { TickingItem } from 'sections/tickingList/table/TickingListTable.utils'
import { FilterWithPagination, SortType, TickingFilters } from './Filters.utils'
import { State, initialState } from './FiltersState'

export type Action =
  | {
      type: 'SET_MODULE_FILTERS'
      payload: {
        module: keyof State
        filters: Partial<FilterWithPagination<TickingFilters>>
      }
    }
  | {
      type: 'RESET_MODULE_FILTERS'
      payload: {
        module: keyof State
      }
    }
  | {
      type: 'SET_MODULE_SORTING'
      payload: {
        module: keyof State
        sorting: Partial<Record<keyof TickingItem, SortType>>
      }
    }
  | {
      type: 'RESET_MODULE_SORTING'
      payload: {
        module: keyof State
      }
    }
  | {
      type: 'TOGGLE_MODULE_FILTERS'
      payload: {
        module: keyof State
      }
    }

export type Dispatch = (action: Action) => void

export function filtersReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_MODULE_FILTERS':
      return {
        ...state,
        [action.payload.module]: {
          ...state[action.payload.module],
          filters: {
            ...state[action.payload.module].filters,
            ...action.payload.filters
          }
        }
      }

    case 'RESET_MODULE_FILTERS':
      return {
        ...state,
        [action.payload.module]: {
          ...state[action.payload.module],
          filters: initialState[action.payload.module].filters
        }
      }

    case 'SET_MODULE_SORTING':
      return {
        ...state,
        [action.payload.module]: {
          ...state[action.payload.module],
          sorting: action.payload.sorting
        }
      }

    case 'RESET_MODULE_SORTING': {
      return {
        ...state,
        [action.payload.module]: {
          ...state[action.payload.module],
          sorting: initialState[action.payload.module].sorting
        }
      }
    }

    case 'TOGGLE_MODULE_FILTERS':
      return {
        ...state,
        [action.payload.module]: {
          ...state[action.payload.module],
          openedFilterMenu: !state[action.payload.module].openedFilterMenu
        }
      }

    default:
      return initialState
  }
}
