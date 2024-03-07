import { useTransmissionList } from "@/api/lov/lovTransmissions"
import { MultiSelect } from "@/components/Inputs/Select/MultiSelect"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useTickingListFilters } from "./useTickingListFilters"

type Props = {}

export const TransmissionFilter: FC<Props> = () => {
  const { t } = useTranslation()
  const { setFilter, activeFilters } = useTickingListFilters()
  const { transmissions: options } = useTransmissionList()
  const selectedOptions = options.filter((option) => activeFilters.transmissionIds?.includes(option.value))

  const handleBodyChange = (transmissionIds: string[]) => {
    setFilter({ transmissionIds })
  }

  const handleRemove = (value: string) => {
    setFilter({ transmissionIds: activeFilters.transmissionIds?.filter((id) => id !== value) })
  }

  const clear = () => {
    setFilter({ transmissionIds: [] })
  }

  return (
    <MultiSelect
      name="transmission"
      placeholder={t("filters_transmission")}
      value={activeFilters.transmissionIds ?? []}
      selectedOptions={selectedOptions}
      onChange={handleBodyChange}
      options={options}
      clear={clear}
      handleRemove={handleRemove}
    />
  )
}
