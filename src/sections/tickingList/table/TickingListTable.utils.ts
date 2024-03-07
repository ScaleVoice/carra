import { paths } from "@/api/generated/ticking"
import { QUERY_KEYS } from "@/constants/queryKeys"
import { TickingFilters } from "@/sections/filtering/reducer/Filters.utils"
import { useQuery } from "@tanstack/react-query"
import { mockTickingAdSearchResponse } from "mocks/ticking"

type TickingResponse =
  paths["/ticking/ticking-app/ticking-ads/search"]["post"]["responses"]["200"]["content"]["application/com.driverama-v1+json"]

export type TickingItem = TickingResponse["content"][number]

// 3 mins
const REFETCH_INTERVAL = 180000

// const fetchTickingListData = async (
//   filters: Partial<TickingFilters>>,
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

const fetchTickingListData = async (filters: Partial<TickingFilters>, sort?: string[]): Promise<TickingResponse> => {
  return mockTickingAdSearchResponse
}

function useTickingListData(filters: Partial<TickingFilters>, sort?: string[]) {
  return useQuery({
    queryKey: QUERY_KEYS.tickingList({ filters, sort }),
    queryFn: async () => await fetchTickingListData(filters, sort),
    // to avoid jumping between loading and success states
    // keepPreviousData: true,
    refetchInterval: REFETCH_INTERVAL,
  })
}
