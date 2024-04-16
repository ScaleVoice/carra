import { TickingItem, useTickingListData } from "./useSearch"

export const useCarDetail = (carId: string) => {
  const { data } = useTickingListData({})

  return data?.content.find((item: TickingItem) => item.id === carId)
}
