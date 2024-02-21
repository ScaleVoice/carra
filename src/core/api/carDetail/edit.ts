import { useMutation, useQueryClient } from '@tanstack/react-query'
import { HTTPMethod } from 'constants/httpMethod'
import { QUERY_KEYS } from 'constants/queryKeys'
import { URLS } from 'constants/urls'
import { createSortArray } from 'sections/filtering/reducer/Filters.utils'
import { useFiltersContext } from 'sections/filtering/reducer/FiltersContext'
import { TickingItem } from 'sections/tickingList/table/TickingListTable.utils'
import { apiFetch } from 'utils/fetch'
import { paths } from '../generated/ticking'

type EditCarDetaiLResponse =
  paths['/ticking/ticking-app/ticking-ads/{tickingAdId}']['patch']['responses']['200']['content']['application/com.driverama-v1+json']

const editCarDetail = async (
  data: TickingItem
): Promise<EditCarDetaiLResponse> => {
  const response = await apiFetch(URLS.editTickingAd(data.id), {
    method: HTTPMethod.PATCH,
    body: data
  })

  return response.json()
}

export function useCarDetailMutation() {
  const queryClient = useQueryClient()
  const {
    state: {
      tickingList: { filters, sorting }
    }
  } = useFiltersContext()

  return useMutation({
    mutationFn: async (data: TickingItem) => await editCarDetail(data),
    onSuccess: () => {
      // refresh ticking list data
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.tickingList({
          filters,
          sort: createSortArray(sorting)
        })
      })
    }
  })
}
