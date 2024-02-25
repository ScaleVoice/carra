import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "constants/queryKeys"
import { paths } from "core/api/generated/ticking"
import { mockTickingAdSearchResponse } from "mocks/ticking"
import { FilterWithPagination, TickingFilters, createSortArray } from "sections/filtering/reducer/Filters.utils"
import { useFiltersContext } from "sections/filtering/reducer/FiltersContext"
import { useTickingListTableColumns } from "../hooks/useTickingListColumns"

type TickingResponse =
  paths["/ticking/ticking-app/ticking-ads/search"]["post"]["responses"]["200"]["content"]["application/com.driverama-v1+json"]

export type TickingItem = TickingResponse["content"][number]

// 3 mins
const REFETCH_INTERVAL = 180000

// const fetchTickingListData = async (
//   filters: FilterWithPagination<Partial<TickingFilters>>,
//   sort?: string[]
// ): Promise<TickingResponse> => {
//   const response = await apiFetch(URLS.tickingAdsSearch, {
//     method: HTTPMethod.POST,
//     body: {
//       ...filters,
//       // we don't need to send page with filters (it is sent via search params)
//       page: undefined,
//       carGrades: [2, 3, 4, 5],
//       excludeWithStateAction: true
//     },
//     searchParams: {
//       sort,
//       page: filters.page - 1,
//       size: 30
//     }
//   })

//   const result = await response.json()

//   return result
// }

const fetchTickingListData = async (
  filters: FilterWithPagination<Partial<TickingFilters>>,
  sort?: string[],
): Promise<TickingResponse> => {
  return mockTickingAdSearchResponse
}

function useTickingListData(filters: FilterWithPagination<Partial<TickingFilters>>, sort?: string[]) {
  return useQuery({
    queryKey: QUERY_KEYS.tickingList({ filters, sort }),
    queryFn: async () => await fetchTickingListData(filters, sort),
    // to avoid jumping between loading and success states
    keepPreviousData: true,
    refetchInterval: REFETCH_INTERVAL,
  })
}

export function useTickingListTable() {
  const {
    state: {
      tickingList: { filters, sorting, openedFilterMenu },
    },
    dispatch,
  } = useFiltersContext()

  const setPage = (page: number) => {
    dispatch({
      type: "SET_MODULE_FILTERS",
      payload: {
        module: "tickingList",
        filters: {
          page,
        },
      },
    })
  }

  const query = useTickingListData(filters, createSortArray(sorting))

  const { columns, lovsLoading } = useTickingListTableColumns()

  const isLoading = lovsLoading || (query.isInitialLoading && query.isFetching)

  return {
    query: {
      ...query,
      data: {
        ...query.data,
        content: query.data?.content ?? [],
        totalPages: query.data?.totalPages ?? 0,
        totalElements: query.data?.totalElements ?? 0,
      },
    },
    page: filters.page,
    openedFilters: openedFilterMenu,
    setPage,
    columns,
    isLoading,
  }
}
