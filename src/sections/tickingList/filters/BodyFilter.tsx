import { useBodiesSearchList } from "@/api/lov/lovBodiesSearch"
import { MultiSelect } from "@/components/Inputs/Select/MultiSelect"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useTickingListFilters } from "./useTickingListFilters"

type Props = {}

export const BodyFilter: FC<Props> = () => {
  const { t } = useTranslation()
  const { setFilter, activeFilters } = useTickingListFilters()
  const { bodies: options } = useBodiesSearchList()
  const selectedOptions = options.filter((option) => activeFilters.bodyIds?.includes(option.value))

  const handleBodyChange = (bodyIds: string[]) => {
    setFilter({ bodyIds })
  }

  const handleRemove = (value: string) => {
    setFilter({ bodyIds: activeFilters.bodyIds?.filter((id) => id !== value) })
  }

  const clear = () => {
    setFilter({ bodyIds: [] })
  }

  return (
    <MultiSelect
      name="body"
      placeholder={t("filters_body")}
      value={activeFilters.bodyIds ?? []}
      selectedOptions={selectedOptions}
      onChange={handleBodyChange}
      options={options}
      clear={clear}
      handleRemove={handleRemove}
    />
  )
}
