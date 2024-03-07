import { Sorting, TickingFilters } from "./Filters.utils"

export type State = {
  tickingList: {
    filters: Partial<TickingFilters>
    sorting: Sorting["tickingList"]
    pagination: {
      page: number
    }
    isFilterMenuOpened: boolean
  }
  history: {
    filters: Partial<TickingFilters>
    sorting: Sorting["history"]
    pagination: {
      page: number
    }
    isFilterMenuOpened: boolean
  }
}

export const initialState: State = {
  tickingList: {
    filters: {},
    sorting: {
      downloadedAt: "desc",
    },
    pagination: {
      page: 1,
    },
    isFilterMenuOpened: false,
  },
  history: {
    filters: {},
    sorting: {
      updatedAt: "desc",
    },
    pagination: {
      page: 1,
    },
    isFilterMenuOpened: false,
  },
}
