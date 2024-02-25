import { QUERY_KEYS } from "@/constants/queryKeys"
import { UseQueryOptions, useQuery } from "@tanstack/react-query"
import { makeSearchResponseMock } from "mocks/lov"
import { paths } from "../generated/commonLovs"

export type LovMakeSearchResponse =
  paths["/common-lovs/makes/search"]["post"]["responses"]["200"]["content"]["application/com.driverama-v1+json"]

type QueryBody = paths["/common-lovs/makes/search"]["post"]["requestBody"]["content"]["application/json"]

type Options = UseQueryOptions<LovMakeSearchResponse>

export async function searchMakes(body: QueryBody): Promise<LovMakeSearchResponse> {
  // const response = await apiFetch(URLS.lovMakesSearch, {
  //   method: HTTPMethod.POST,
  //   body
  // })

  // return response.json()

  return makeSearchResponseMock
}

export function useLovMakesSearchQuery(body: QueryBody, opts?: Options) {
  return useQuery({
    queryKey: QUERY_KEYS.lovMakesSearch(body),
    queryFn: async () => await searchMakes(body),
    ...opts,
  })
}
