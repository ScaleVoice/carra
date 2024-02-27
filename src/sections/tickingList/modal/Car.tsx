import { Text } from "@/components/Text"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { TickingItem } from "../table/TickingListTable.utils"
import { AttributeRow } from "./AttributeRow"

type Props = {
  item: TickingItem | null
}

export const Car: FC<Props> = ({ item }) => {
  const { t } = useTranslation("tickingList")
  return (
    <>
      <Text size="xl" className="text-gray-800 self-baseline mt-4">{t("tabs_car_title")}</Text>
      <div className="flex w-full flex-wrap justify-between gap-2 gap-y-8">
        <AttributeRow name="make" value={item?.makeId} label="Make" />
        <AttributeRow name="model" value={item?.modelId} label="Model" />
        <AttributeRow name="year" value={item?.yearOfMake} label="Year" />
        <AttributeRow name="fuelType" value={item?.fuelId} label="Fuel" />
        <AttributeRow name="engine" value={`${item?.powerKw} kW`} label="Engine Power" />
        <AttributeRow name="mileage" value={`${item?.speedometerMileageKm} km`} label="Mileage" />
      </div>
    </>
  )
}
