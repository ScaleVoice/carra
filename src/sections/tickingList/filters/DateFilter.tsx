import { DatePicker } from "@/components/Inputs/Datepicker/Datepicker"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useTickingListFilters } from "./useTickingListFilters"

type Props = {}

export const DateFilter: FC<Props> = () => {
  const { t } = useTranslation()
  const { setFilter, activeFilters } = useTickingListFilters()

  const handleFromChange = (value: string | null) => {
    setFilter({ downloadedAtFrom: value || undefined })
  }

  const handleToChange = (value: string | null) => {
    setFilter({ downloadedAtTo: value || undefined })
  }

  return (
    <div className="flex flex-col">
      <label className="mb-1 text-gray-600">{t("filters_downloaded_at")}</label>
      <div className="flex flex-col items-center justify-between">
        <div className="mb-2">
          <DatePicker
            name="from"
            value={activeFilters.downloadedAtFrom ?? null}
            onChange={handleFromChange}
            placeholder={t("from")}
          />
        </div>

        <DatePicker
          name="to"
          value={activeFilters.downloadedAtTo ?? null}
          onChange={handleToChange}
          placeholder={t("to")}
        />
      </div>
    </div>
  )
}
