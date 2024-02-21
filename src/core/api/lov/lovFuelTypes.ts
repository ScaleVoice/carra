import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { QUERY_KEYS } from 'constants/queryKeys'
import { URLS } from 'constants/urls'
import { useMemo } from 'react'
import { apiFetch } from 'utils/fetch'
import { operations } from '../generated/commonLovs'
import { fuelSearchResponseMock } from 'mocks/lov'

export type LovFuelTypesResponse =
  operations['getFuelTypes']['responses']['200']['content']['application/com.driverama-v1+json']
type QueryParams = operations['getFuelTypes']['parameters']['query']

type QueryOpts = UseQueryOptions<unknown, unknown, LovFuelTypesResponse>

const fetchFuelTypes = async (
  searchParams?: QueryParams
): Promise<LovFuelTypesResponse> => {
  // const response = await apiFetch(URLS.lovFuelTypes, {
  //   searchParams
  // })

  // return response.json()

  return fuelSearchResponseMock
}

export function useLovFuelTypesQuery(params?: QueryParams, opts?: QueryOpts) {
  const searchParams = {
    ...params,
    sort: params?.sort
  }

  return useQuery({
    queryKey: QUERY_KEYS.lovFuelTypes(params),
    queryFn: async () => await fetchFuelTypes(searchParams),
    ...opts,
    staleTime: Infinity
  })
}

function sortFuelTypes(
  a: { id: string; value: string; label: string },
  b: { id: string; value: string; label: string }
) {
  if (!a.id || !b.id) {
    return 0
  }

  return a.id.localeCompare(b.id)
}

export function useFuelTypeList(opts?: QueryOpts) {
  const { data, ...rest } = useLovFuelTypesQuery({ active: true }, opts)

  const fuelTypes = useMemo(() => {
    return (
      data?.content.map(fuelType => ({
        id: fuelType.id,
        label: fuelType.name || fuelType.id,
        value: fuelType.id
      })) || []
    ).sort(sortFuelTypes)
  }, [data])

  return { fuelTypes, ...rest }
}
