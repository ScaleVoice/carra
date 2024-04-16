import { Option } from "@/components/Inputs/types"
import { QUERY_KEYS } from "@/constants/queryKeys"
import { useQuery } from "@tanstack/react-query"
import { mockBranches } from "../../mocks/branch"
import { paths } from "./generated/lov"

export type Branch =
  paths["/lov/branches/search"]["post"]["responses"]["200"]["content"]["application/com.driverama-v1+json"]["content"][number]

function fetchBranches() {
  return mockBranches
}

export const useBranchSearch = () => {
  return useQuery({
    queryKey: QUERY_KEYS.branch(),
    queryFn: async () => await fetchBranches(),
  })
}

export const useBranchOptions = (data: Branch[]) => {
  const options: Option[] = data?.map((item) => ({ value: item.id, label: item.name || "branch" })) ?? []

  return options
}

export const useBranchDetail = (id?: string | number) => {
  const { data } = useBranchSearch()

  return data?.find((branch) => branch.id === id)
}