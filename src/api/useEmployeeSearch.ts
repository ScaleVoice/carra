import { Option } from "@/components/Inputs/types"
import { QUERY_KEYS } from "@/constants/queryKeys"
import { useQuery } from "@tanstack/react-query"

export const employees = [
  { value: 1, name: "Durward Reynolds" },
  { value: 2, name: "Kenton Towne" },
  { value: 3, name: "Therese Wunsch" },
  { value: 4, name: "Benedict Kessler" },
  { value: 5, name: "Katelyn Rohan" },
]

function fetchEmployees() {
  return employees
}

export const useEmployeeSearch = () => {
  return useQuery({
    queryKey: QUERY_KEYS.employees(),
    queryFn: async () => await fetchEmployees(),
  })
}

export const useEmployeeOptions = (data): Option[] => {
  return data?.map((item) => ({ value: item.value, label: item.name || "Unknown employee" })) ?? []
}

export const useEmployeeDetail = (id?: string | number) => {
  const { data } = useEmployeeSearch()

  return data?.find((employee) => employee.value === id)
}
