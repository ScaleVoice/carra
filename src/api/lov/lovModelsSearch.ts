import { QUERY_KEYS } from "@/constants/queryKeys"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { modelSearchResponseMock } from "mocks/lov"
import { useMemo } from "react"
import { operations } from "../generated/commonLovs"

export type LovModelsSearchResponse =
  operations["getModels"]["responses"]["200"]["content"]["application/com.driverama-v1+json"]
type QueryBody = operations["getModels"]["requestBody"]["content"]["application/json"]

type QueryOpts = UseQueryOptions<unknown, unknown, LovModelsSearchResponse>

export async function fetchModels(body: QueryBody): Promise<LovModelsSearchResponse> {
  // const response = await apiFetch(URLS.lovModelsSearch, {
  //   method: HTTPMethod.POST,
  //   body
  // })

  // return response.json()
  return modelSearchResponseMock
}

export function useLovModelsSearchQuery(body: QueryBody = {}, opts?: QueryOpts) {
  return useQuery({
    queryKey: QUERY_KEYS.lovModelsSearch(body),
    queryFn: async () => await fetchModels(body),
    ...opts,
    staleTime: Infinity,
  })
}

export function useModelList(carMakeIds?: string[], enabled?: boolean) {
  const { data, ...rest } = useLovModelsSearchQuery(
    {
      filter: {
        ids: [],
        active: true,
        makeIds: carMakeIds,
        yearFromIncludeNull: true,
      },
    },
    {
      enabled,
      queryKey: QUERY_KEYS.lovModelsSearch({ filter: { ids: carMakeIds } }),
    },
  )

  const models = useMemo(() => {
    return data?.content || []
  }, [data])

  return { ...rest, models }
}

export function useModelDetail(modelId?: string) {
  const { data, ...rest } = useLovModelsSearchQuery(
    {
      filter: {
        ids: modelId ? [modelId] : [],
        yearFromIncludeNull: true,
        active: true,
      },
    },
    { enabled: !!modelId, queryKey: QUERY_KEYS.lovModelsSearch({ filter: { ids: [modelId] } }) },
  )
  const model = useMemo(() => {
    return data?.content.find((model) => model.id === modelId)
  }, [modelId, data])

  return { ...rest, data, model }
}

export type LovModel = LovModelsSearchResponse["content"][number]
