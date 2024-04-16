import { paths } from "@/api/generated/ticking"
import { TickingItem } from "@/api/useSearch"
import { SortDirection } from "@tanstack/react-table"
import { State } from "./FiltersState"

type TickingAdsSearchBody =
  paths["/ticking/ticking-app/ticking-ads/search"]["post"]["requestBody"]["content"]["application/json"]

// export type TickingFilters = Omit<TickingAdsSearchBody, "excludeWitStateAction">

export type TickingFilters = {
  makeIds?: string[]
  modelIds?: string[]
  /** Format: int32 */
  yearOfMakeFrom?: number
  /** Format: int32 */
  yearOfMakeTo?: number
  excludeWithoutYearOfMake?: boolean
  /** Format: int32 */
  speedometerMileageKmFrom?: number
  /** Format: int32 */
  speedometerMileageKmTo?: number
  excludeWithoutSpeedometerMileageKm?: boolean
  transmissionIds?: string[]
  bodyIds?: string[]
  carGrades?: number[]
  stateActions?: ("SMS_ONLY" | "CALL" | "HOT_DEAL" | "NOT_INTERESTED")[]
  excludeWithStateAction?: boolean
  fullText?: string
  sellerIds?: string[]
  expectedPriceFrom?: number
  expectedPriceTo?: number
  excludeWithoutExpectedPrice?: boolean
  statePhases?: ("NEW_AD" | "TICKED" | "APPOINTMENT_CREATED" | "LOST" | "DUPLICATE" | "BOUGHT")[]
  excludeStatePhases?: ("NEW_AD" | "TICKED" | "APPOINTMENT_CREATED" | "LOST" | "DUPLICATE" | "BOUGHT")[]
  /** Format: date-time */
  downloadedAtFrom?: string
  /** Format: date-time */
  downloadedAtTo?: string
  /** Format: int32 */
  rankFrom?: number
  /** Format: int32 */
  rankTo?: number
  profitFrom?: number
  profitTo?: number
  serverIds?: number[]
  sellerTypes?: ("COMPANY" | "PERSON")[]
}

export type Sorting = Record<keyof State, Partial<Record<keyof TickingItem, SortDirection | null>>>

export function createSortArray(sort?: Partial<Record<keyof TickingItem, SortDirection>>) {
  if (!sort) {
    return []
  }

  const sortArray = Object.entries(Boolean).map(([key, value]) => [key, value].join(","))

  return !!sortArray.length ? sortArray : undefined
}
