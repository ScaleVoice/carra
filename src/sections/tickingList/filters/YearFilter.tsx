import { Input } from "@/components/Inputs/Input"
import { ChangeEvent, FC } from "react"
import { useTranslation } from "react-i18next"
import { useTickingListFilters } from "./useTickingListFilters"

type Props = {}

export const YearFilter: FC<Props> = () => {
  const { t } = useTranslation()
  const { setFilter, activeFilters } = useTickingListFilters()

  console.log('activeFilters', activeFilters)

  const handleFromChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)

    // @ts-ignore
    setFilter({ yearOfMakeFrom: value > 0 ? value : "" })
  }

  const handleToChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)

    // @ts-ignore
    setFilter({ yearOfMakeTo: value > 0 ? value : "" })
  }

  return (
    <div className="flex flex-col">
      <label className="mb-1 text-gray-600">{t("filters_year")}</label>
      <div className="flex items-center justify-between">
        <Input
          type="number"
          name="from"
          placeholder={t("from")}
          containerClassName="w-[47%]"
          value={activeFilters.yearOfMakeFrom}
          onChange={handleFromChange}
        />
        <span className="text-gray-300">-</span>
        <Input
          type="number"
          name="to"
          placeholder={t("to")}
          containerClassName="w-[47%]"
          value={activeFilters.yearOfMakeTo}
          onChange={handleToChange}
        />
      </div>
    </div>
  )
}
