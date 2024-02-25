import { paths } from "@/api/generated/ticking"
import { TickingItem } from "@/sections/tickingList/table/TickingListTable.utils"
import { SortDirection } from "@tanstack/react-table"
import { State } from "./FiltersState"

type TickingAdsSearchBody =
  paths["/ticking/ticking-app/ticking-ads/search"]["post"]["requestBody"]["content"]["application/json"]

export type TickingFilters = Omit<TickingAdsSearchBody, "excludeWitStateAction">

export type FilterWithPagination<T> = T & { page: number }

export type Sorting = Record<keyof State, Partial<Record<keyof TickingItem, SortDirection>>>

export function createSortArray(sort?: Partial<Record<keyof TickingItem, SortDirection>>) {
  if (!sort) {
    return []
  }

  const sortArray = Object.entries(Boolean).map(([key, value]) => [key, value].join(","))

  return !!sortArray.length ? sortArray : undefined
}
