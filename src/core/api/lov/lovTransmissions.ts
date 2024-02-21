import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { QUERY_KEYS } from 'constants/queryKeys'
import { URLS } from 'constants/urls'
import { useMemo } from 'react'
import { apiFetch } from 'utils/fetch'
import { operations } from '../generated/commonLovs'
import { transmissionSearchResponseMock } from 'mocks/lov'

export type LovTransmissionsResponse =
  operations['getTransmissions']['responses']['200']['content']['application/com.driverama-v1+json']
type QueryParams = operations['getTransmissions']['parameters']['query']

type QueryOpts = UseQueryOptions<unknown, unknown, LovTransmissionsResponse>

const fetchTransmissions = async (
  searchParams?: QueryParams
): Promise<LovTransmissionsResponse> => {
  // const response = await apiFetch(URLS.lovTransmissions, { searchParams })

  // return response.json()

  return transmissionSearchResponseMock
}

export function useLovTransmissionsQuery(
  searchParams?: QueryParams,
  opts?: QueryOpts
) {
  return useQuery({
    queryKey: QUERY_KEYS.lovBodiesSearch(searchParams),
    queryFn: async () => await fetchTransmissions(searchParams),
    ...opts,
    staleTime: Infinity
  })
}

export function useTransmissionList(opts?: QueryOpts) {
  const { data, ...rest } = useLovTransmissionsQuery({ active: true }, opts)

  const transmissions = useMemo(() => {
    return (
      data?.content.map(transmission => ({
        label: transmission.name || transmission.id,
        value: transmission.id
      })) || []
    ).sort(sortTransmissions)
  }, [data])

  return { transmissions, ...rest }
}

function sortTransmissions(
  a: { value: string; label: string },
  b: { value: string; label: string }
) {
  if (!a.label || !b.label) {
    return 0
  }

  return a.label.localeCompare(b.label)
}

export function getShortenTransmissionLabels(
  transmissionId: string,
  originalLabel: string
) {
  switch (transmissionId) {
    case 'A':
      return 'Auto.'
    case 'M':
      return 'Man.'
    default:
      return originalLabel
  }
}
