import { FilterWithPagination, Sorting, TickingFilters } from './Filters.utils'

export type State = {
  tickingList: {
    filters: FilterWithPagination<Partial<TickingFilters>>
    sorting: Sorting['tickingList']
    openedFilterMenu: boolean
  }
  history: {
    filters: FilterWithPagination<Partial<TickingFilters>>
    sorting: Sorting['history']
    openedFilterMenu: boolean
  }
  callCustomer: {
    filters: FilterWithPagination<Partial<TickingFilters>>
    sorting: Sorting['callCustomer']
    openedFilterMenu: boolean
  }
}

export const initialState: State = {
  tickingList: {
    filters: {
      page: 1,
      carGrades: [2, 3, 4, 5]
    },
    sorting: {
      downloadedAt: 'desc'
    },
    openedFilterMenu: false
  },
  history: {
    filters: {
      page: 1,
      stateActions: ['SMS_ONLY', 'CALL', 'HOT_DEAL', 'NOT_INTERESTED']
    },
    sorting: {
      updatedAt: 'desc'
    },
    openedFilterMenu: false
  },
  callCustomer: {
    filters: {
      page: 1,
      stateActions: ['HOT_DEAL', 'CALL']
    },
    sorting: {
      downloadedAt: 'desc'
    },
    openedFilterMenu: false
  }
}
