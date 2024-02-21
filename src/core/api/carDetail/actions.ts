import { useMutation, useQueryClient } from '@tanstack/react-query'
import { HTTPMethod } from 'constants/httpMethod'
import { QUERY_KEYS } from 'constants/queryKeys'
import { URLS } from 'constants/urls'
import { createSortArray } from 'sections/filtering/reducer/Filters.utils'
import { useFiltersContext } from 'sections/filtering/reducer/FiltersContext'
import { apiFetch } from 'utils/fetch'
import { paths } from '../generated/ticking'

type TickingAdActionResponse =
  paths['/ticking/ticking-app/ticking-ads/{tickingAdId}/action']['put']['responses']['200']['content']['application/com.driverama-v1+json']

export type TickingAdAction =
  paths['/ticking/ticking-app/ticking-ads/{tickingAdId}/action']['put']['requestBody']['content']['application/json']['action']

const updateTickingAdState = async (
  id: string,
  action: TickingAdAction
): Promise<TickingAdActionResponse> => {
  const response = await apiFetch(URLS.tickingAdAction(id), {
    method: HTTPMethod.PUT,
    body: {
      action
    }
  })

  return response.json()
}

export function useAdStateMutation() {
  const queryClient = useQueryClient()
  const {
    state: {
      tickingList: { filters, sorting }
    }
  } = useFiltersContext()

  return useMutation({
    mutationFn: async ({
      id,
      action
    }: {
      id: string
      action: TickingAdAction
    }) => await updateTickingAdState(id, action),
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
