import { useMakeList } from "@/api/lov/lovMakes"
import { MultiSelect } from "@/components/Inputs/Select/MultiSelect"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useTickingListFilters } from "./useTickingListFilters"

type Props = {}

export const MakeFilter: FC<Props> = () => {
  const { t } = useTranslation()
  const { setFilter, activeFilters } = useTickingListFilters()
  const { carMakes } = useMakeList()
  const options = carMakes.map((model) => ({ value: model.id, label: model.name ?? "model" }))
  const selectedOptions = options.filter((option) => activeFilters.makeIds?.includes(option.value))

  const handleBodyChange = (makeIds: string[]) => {
    setFilter({ makeIds })
  }

  const handleRemove = (value: string) => {
    setFilter({ makeIds: activeFilters.makeIds?.filter((id) => id !== value) })
  }

  const clear = () => {
    setFilter({ makeIds: [] })
  }

  return (
    <MultiSelect
      name="make"
      placeholder={t("filters_make")}
      value={activeFilters.makeIds ?? []}
      selectedOptions={selectedOptions}
      onChange={handleBodyChange}
      options={options}
      clear={clear}
      handleRemove={handleRemove}
    />
  )
}
