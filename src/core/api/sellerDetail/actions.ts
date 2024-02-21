import { useMutation, useQueryClient } from '@tanstack/react-query'
import { HTTPMethod } from 'constants/httpMethod'
import { QUERY_KEYS } from 'constants/queryKeys'
import { URLS } from 'constants/urls'
import { createSortArray } from 'sections/filtering/reducer/Filters.utils'
import { useFiltersContext } from 'sections/filtering/reducer/FiltersContext'
import { apiFetch } from 'utils/fetch'
import { paths } from '../generated/ticking'

type SellerStateUpdateResponse =
  paths['/ticking/ticking-app/ticking-ads/{tickingAdId}/seller/{sellerId}']['put']['responses']['200']['content']['application/com.driverama-v1+json']

export type SellerState =
  paths['/ticking/ticking-app/ticking-ads/{tickingAdId}/seller/{sellerId}']['put']['requestBody']['content']['application/json']['state']

type CallResultResponse =
  paths['/ticking/ticking-app/ticking-ads/{tickingAdId}/call-result']['put']['responses']['200']['content']['application/com.driverama-v1+json']

export type CallResultBody =
  paths['/ticking/ticking-app/ticking-ads/{tickingAdId}/call-result']['put']['requestBody']['content']['application/json']

const updateSellerState = async (
  tickingAdId: string,
  sellerId: string,
  state: SellerState
): Promise<SellerStateUpdateResponse> => {
  const response = await apiFetch(
    URLS.updateSellerState(tickingAdId, sellerId),
    {
      method: HTTPMethod.PUT,
      body: {
        state
      }
    }
  )

  return response.json()
}

export function useSellerStateMutation() {
  const queryClient = useQueryClient()
  const {
    state: {
      callCustomer: { filters, sorting }
    }
  } = useFiltersContext()

  return useMutation({
    mutationFn: async ({
      tickingAdId,
      sellerId,
      state
    }: {
      tickingAdId: string
      sellerId: string
      state: SellerState
    }) => await updateSellerState(tickingAdId, sellerId, state),
    onSuccess: () => {
      // refresh callcustomer list data
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.callCustomer({
          filters,
          sort: createSortArray(sorting)
        })
      })
    }
  })
}

const updateCallResult = async (
  tickingAdId: string,
  body: CallResultBody
): Promise<CallResultResponse> => {
  const response = await apiFetch(URLS.callResult(tickingAdId), {
    method: HTTPMethod.PUT,
    body
  })

  return response.json()
}

export function useCallResultUpdate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      tickingAdId,
      body
    }: {
      tickingAdId: string
      body: CallResultBody
    }) => await updateCallResult(tickingAdId, body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.sellerCurrentAds()
      })
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.sellerHistoricalAds()
      })
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.callCustomer()
      })
    }
  })
}
