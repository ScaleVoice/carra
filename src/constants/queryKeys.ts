/**
 *
 * @param baseName
 *
 * @param args
 * @returns formatted query key
 *
 * Filters nil values in order to make query invalidation work correctly
 * e.g. QUERY_KEYS.sellerHistoricalAds() returns => ['historicalAds'] instead of ['historicalAds', undefined]
 */
const createQueryKey = (baseName: string, args?: Record<string, unknown>) => [baseName, args].filter(Boolean)

export const QUERY_KEYS = {
  tickingList: (args?: Record<string, unknown>) => createQueryKey("tickingListData", args),
  callCustomer: (args?: Record<string, unknown>) => createQueryKey("customerCallData", args),
  history: (args?: Record<string, unknown>) => createQueryKey("historyListData", args),
  sellerHistoricalAds: (args?: Record<string, unknown>) => createQueryKey("historicalAds", args),
  sellerCurrentAds: (args?: Record<string, unknown>) => createQueryKey("currentAds", args),
  branch: (args?: Record<string, unknown>) => createQueryKey("branch", args),
  employees: (args?: Record<string, unknown>) => createQueryKey("employees", args),

  //lov
  lovBodiesSearch: (args?: Record<string, unknown>) => createQueryKey("bodiesSearch", args),
  lovFuelTypes: (args?: Record<string, unknown>) => createQueryKey("fuelTypes", args),
  lovMakes: (args?: Record<string, unknown>) => createQueryKey("makes", args),
  lovMakesSearch: (args?: Record<string, unknown>) => createQueryKey("makesSearch", args),
  lovModelsSearch: (args?: Record<string, unknown>) => createQueryKey("modelsSearch", args),
  lovTransmissions: (args?: Record<string, unknown>) => createQueryKey("transmissions", args),
}
