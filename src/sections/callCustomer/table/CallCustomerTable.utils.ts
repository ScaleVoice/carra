import { useQuery } from '@tanstack/react-query'
import { HTTPMethod } from 'constants/httpMethod'
import { QUERY_KEYS } from 'constants/queryKeys'
import { URLS } from 'constants/urls'
import { paths } from 'core/api/generated/ticking'
import {
  FilterWithPagination,
  TickingFilters,
  createSortArray
} from 'sections/filtering/reducer/Filters.utils'
import { useFiltersContext } from 'sections/filtering/reducer/FiltersContext'
import { apiFetch } from 'utils/fetch'
import { useCallCustomerTableColumns } from './CallCustomerTable.config'
import { mockTickingAdSearchResponse } from 'mocks/ticking'

type CallCustomerResponse =
  paths['/ticking/ticking-app/ticking-ads/search']['post']['responses']['200']['content']['application/com.driverama-v1+json']

export type CallCustomerItem = CallCustomerResponse['content'][number]

// 3 mins
const REFETCH_INTERVAL = 180000

const fetchCustomerCallData = async (
  filters: FilterWithPagination<Partial<TickingFilters>>,
  sort?: string[]
): Promise<CallCustomerResponse> => {
  // const response = await apiFetch(URLS.tickingAdsSearch, {
  //   method: HTTPMethod.POST,
  //   body: {
  //     ...filters,
  //     // we don't need to send page with filters (it is sent via search params)
  //     page: undefined,
  //     statePhases: ['TICKED']
  //   },
  //   searchParams: {
  //     sort,
  //     page: filters.page - 1,
  //     size: 30
  //   }
  // })

  // const result = await response.json()

  // return result

  return mockTickingAdSearchResponse
}

function useCallCustomerData(
  filters: FilterWithPagination<Partial<TickingFilters>>,
  sort?: string[]
) {
  return useQuery({
    queryKey: QUERY_KEYS.callCustomer({ filters, sort }),
    queryFn: async () => await fetchCustomerCallData(filters, sort),
    // to avoid jumping between loading and success states
    keepPreviousData: true,
    refetchInterval: REFETCH_INTERVAL
  })
}

export function useCallCustomerTable() {
  const {
    state: {
      callCustomer: { filters, sorting, openedFilterMenu }
    },
    dispatch
  } = useFiltersContext()

  const setPage = (page: number) => {
    dispatch({
      type: 'SET_MODULE_FILTERS',
      payload: {
        module: 'callCustomer',
        filters: {
          page
        }
      }
    })
  }

  const query = useCallCustomerData(filters, createSortArray(sorting))

  const { columns, lovsLoading } = useCallCustomerTableColumns()

  const isLoading = lovsLoading || (query.isInitialLoading && query.isFetching)

  return {
    query: {
      ...query,
      data: {
        ...query.data,
        content: query.data?.content ?? [],
        totalPages: query.data?.totalPages ?? 0,
        totalElements: query.data?.totalElements ?? 0
      }
    },
    page: filters.page,
    openedFilters: openedFilterMenu,
    setPage,
    columns,
    isLoading
  }
}
