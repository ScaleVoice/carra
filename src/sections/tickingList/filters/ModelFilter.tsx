import { useModelList } from "@/api/lov/lovModelsSearch"
import { MultiSelect } from "@/components/Inputs/Select/MultiSelect"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useTickingListFilters } from "./useTickingListFilters"

type Props = {}

export const ModelFilter: FC<Props> = () => {
  const { t } = useTranslation()
  const { setFilter, activeFilters } = useTickingListFilters()
  const { models } = useModelList()
  const options = models.map((model) => ({ value: model.id, label: model.name ?? "model" }))
  const selectedOptions = options.filter((option) => activeFilters.modelIds?.includes(option.value))

  const handleBodyChange = (modelIds: string[]) => {
    setFilter({ modelIds })
  }

  const handleRemove = (value: string) => {
    setFilter({ modelIds: activeFilters.modelIds?.filter((id) => id !== value) })
  }

  const clear = () => {
    setFilter({ modelIds: [] })
  }

  return (
    <MultiSelect
      name="model"
      placeholder={t("filters_model")}
      value={activeFilters.modelIds ?? []}
      selectedOptions={selectedOptions}
      onChange={handleBodyChange}
      options={options}
      clear={clear}
      handleRemove={handleRemove}
    />
  )
}
