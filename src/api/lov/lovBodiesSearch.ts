import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { HTTPMethod } from '@/constants/httpMethod'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { URLS } from '@/constants/urls'
import { useMemo } from 'react'
import { paths } from '../generated/commonLovs'
import { bodySearchResponseMock } from 'mocks/lov'

export type LovBodiesSearchResponse =
  paths['/common-lovs/bodies/search']['post']['responses']['200']['content']['application/com.driverama-v1+json']

export type BodiesSearchRequestBody =
  paths['/common-lovs/bodies/search']['post']['requestBody']['content']['application/json']
type QueryOptions = UseQueryOptions<unknown, unknown, LovBodiesSearchResponse>

async function fetchLovBodiesSearch(
  body: BodiesSearchRequestBody
): Promise<LovBodiesSearchResponse> {
  // const res = await apiFetch(URLS.lovBodiesSearch, {
  //   method: HTTPMethod.POST,
  //   body
  // })

  // return res.json()

  return bodySearchResponseMock
}

export function useLovBodiesSearchQuery(
  body: BodiesSearchRequestBody,
  options?: QueryOptions
) {
  return useQuery({
    queryKey: QUERY_KEYS.lovBodiesSearch(body),
    queryFn: async () => await fetchLovBodiesSearch(body),
    ...options,
    staleTime: Infinity
  })
}

export function useBodiesSearchList(
  modelIds?: string[],
  makeIds?: string[],
  opts?: QueryOptions
) {
  const { data, ...rest } = useLovBodiesSearchQuery(
    {
      ids: [],
      active: true,
      modelIds,
      makeIds
    },
    opts
  )

  const bodies = useMemo(
    () =>
      data?.content?.map(body => ({
        label: body.name ?? body.id,
        value: body.id
      })) ?? [],
    [data]
  )

  return { bodies, ...rest }
}
