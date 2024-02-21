import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { QUERY_KEYS } from 'constants/queryKeys'
import { URLS } from 'constants/urls'
import { useMemo } from 'react'
import { apiFetch } from 'utils/fetch'
import { Maybe } from 'utils/types'
import { operations } from '../generated/commonLovs'
import { makeSearchResponseMock } from 'mocks/lov'

export type LovMakesResponse =
  operations['getMakes']['responses']['200']['content']['application/com.driverama-v1+json']
type QueryParams = operations['getMakes']['parameters']['query']
type QueryOpts = UseQueryOptions<unknown, unknown, LovMakesResponse>

const fetchMakes = async (
  searchParams?: QueryParams
): Promise<LovMakesResponse> => {
  // const response = await apiFetch(URLS.lovMakes, { searchParams })

  // return response.json()

  return makeSearchResponseMock
}

export function useLovMakesQuery(searchParams?: QueryParams, opts?: QueryOpts) {
  return useQuery({
    queryKey: QUERY_KEYS.lovMakes(searchParams),
    queryFn: async () => await fetchMakes(searchParams),
    ...opts,
    staleTime: Infinity
  })
}

export function useMakeList(
  args?: {
    search?: string
    maxFeaturedCount?: number
  },
  enabled?: boolean
) {
  const { maxFeaturedCount, search } = args || {}
  const { data, ...rest } = useLovMakesQuery({ active: true }, { enabled })

  const carMakes = useMemo(() => {
    const makes = data?.content || []
    return makes
  }, [data])

  const popularMakes = useMemo(
    () =>
      carMakes
        .filter(make => make.popularity)
        .sort((a, b) =>
          a.popularity && b.popularity ? a.popularity - b.popularity : 0
        )
        .slice(0, maxFeaturedCount),
    [carMakes, maxFeaturedCount]
  )

  const filteredCarMakes = useMemo(() => {
    if (!search) {
      return carMakes
    }

    return carMakes.filter(make =>
      make.name?.toLowerCase().includes(search.toLowerCase())
    )
  }, [carMakes, search])

  return { ...rest, carMakes, featuredMakes: popularMakes, filteredCarMakes }
}

export function useMakeDetail(makeId: Maybe<string>) {
  const { data, ...rest } = useLovMakesQuery(
    { active: true },
    { enabled: !!makeId }
  )

  const make = useMemo(() => {
    return data?.content.find(make => make.id === makeId)
  }, [makeId, data])

  return { ...rest, data, make }
}

export type LovMake = LovMakesResponse['content'][number]

export function sortMakes(
  a: { value: string; label: string },
  b: { value: string; label: string }
) {
  if (!a.label || !b.label) {
    return 0
  }

  return a.label.localeCompare(b.label)
}
