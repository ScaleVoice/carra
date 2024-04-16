import { useBodiesSearchList } from "@/api/lov/lovBodiesSearch"
import { useFuelTypeList } from "@/api/lov/lovFuelTypes"
import { useMakeList } from "@/api/lov/lovMakes"
import { useLovModelsSearchQuery } from "@/api/lov/lovModelsSearch"
import { TickingItem } from "@/api/useSearch"
import { Icon } from "@/components/Icons"
import { useSortableColumns } from "@/components/Table/Sorting/SortableColumn"
import { Text } from "@/components/Text"
import { formatCurrency } from "@/utils/currency"
import { createColumnHelper } from "@tanstack/react-table"
import { useTranslation } from "react-i18next"
import { ERROR, SUCCESS } from "tailwind.config"

export const useTickingListTableColumns = () => {
  const { t } = useTranslation(["tickingList", "common"])

  const { createSortableColumn } = useSortableColumns<TickingItem>("tickingList")
  const columnHelper = createColumnHelper<TickingItem>()

  const makeQuery = useMakeList()
  const modelQuery = useLovModelsSearchQuery()
  const bodyQuery = useBodiesSearchList()
  const fuelTypeQuery = useFuelTypeList()

  const lovsLoading = [makeQuery, modelQuery, bodyQuery, fuelTypeQuery].some((query) => query.isLoading)

  const columns = [
    createSortableColumn("adNo", {
      label: t("tickingList:id"),
      cell: (props) => <Text size="sm">{props.row.original.adNo}</Text>,
      size: 110,
      minSize: 110,
    }),
    createSortableColumn("makeId", {
      label: t("tickingList:make"),
      cell: (props) => {
        const makeId = props.row.original.makeId

        const makeLabel = makeQuery.carMakes.find((make) => make.id === makeId)?.name

        return <Text size="sm">{makeLabel ?? t("common:nil_value")}</Text>
      },
    }),
    createSortableColumn("modelId", {
      label: t("tickingList:model"),
      cell: (props) => {
        const modelId = props.row.original.modelId
        const modelLabel = modelQuery.data?.content.find((model) => model.id === modelId)?.name

        return <Text size="sm">{modelLabel ?? t("common:nil_value")}</Text>
      },
    }),
    createSortableColumn("yearOfMake", {
      label: t("tickingList:year_of_make"),
      cell: (props) => {
        const year = props.row.original.yearOfMake

        return <Text size="sm">{year ? year : t("common:nil_value")}</Text>
      },
    }),
    createSortableColumn("speedometerMileageKm", {
      label: t("tickingList:mileage"),
      cell: (props) => {
        const mileage = props.row.original.speedometerMileageKm

        return <Text size="sm">{mileage ? t("common:km_format", { km: mileage }) : t("common:nil_value")}</Text>
      },
      size: 120,
    }),
    createSortableColumn("expectedPrice", {
      label: t("tickingList:price"),
      cell: (props) => {
        const price = props.getValue()

        return <Text size="sm">{price ? formatCurrency(price) : t("common:nil_value")}</Text>
      },
      size: 120,
    }),
    createSortableColumn("fuelId", {
      label: t("tickingList:fuel_type"),
      cell: (props) => {
        const fuelId = props.row.original.fuelId

        const fuelLabel = fuelTypeQuery.fuelTypes.find((fuelType) => fuelType.value === fuelId)?.label

        return <Text size="sm">{fuelLabel ?? t("common:nil_value")}</Text>
      },
      size: 80,
    }),
    createSortableColumn("bodyId", {
      label: t("tickingList:body"),
      cell: (props) => {
        const bodyId = props.row.original.bodyId

        const bodyLabel = bodyQuery.bodies.find((body) => body.value === bodyId)?.label

        return <Text size="sm">{bodyLabel ?? t("common:nil_value")}</Text>
      },
      size: 120,
    }),
    createSortableColumn("seller.name", {
      label: t("tickingList:seller_name"),
      cell: (props) => <Text size="sm">{props.getValue() ?? t("common:nil_value")}</Text>,
      minSize: 200,
    }),
    createSortableColumn("transmissionId", {
      label: t("tickingList:transmission"),
      cell: (props) => {
        const value = props.row.original.transmissionId

        return (
          <div className="flex items-center">
            {value === "A" ? (
              <Icon name="IconCheck" color={SUCCESS.DEFAULT} />
            ) : (
              <Icon name="IconCross" color={ERROR.DEFAULT} />
            )}
          </div>
        )
      },
    }),
  ]

  return { columns, lovsLoading }
}
