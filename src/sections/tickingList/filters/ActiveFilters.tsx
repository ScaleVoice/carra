import { Chip } from "@/components/Base/Chip"
import { Button } from "@/components/Buttons/Button"
import { Icon } from "@/components/Icons"
import { TickingFilters } from "@/sections/filtering/reducer/Filters.utils"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { getActiveFilterList, useTickingListFilters } from "./useTickingListFilters"

type Props = {}

export const ActiveFilters: FC<Props> = () => {
  const { t } = useTranslation("tickingList")
  const { activeFilters, setFilter, clear } = useTickingListFilters()
  const filters = getActiveFilterList(activeFilters)

  const handleRemove = (key: keyof TickingFilters, value: string | number) => {
    if (key === "bodyIds" || key === "modelIds" || key === "transmissionIds" || key === "makeIds") {
      setFilter({ [key]: activeFilters?.[key]?.filter((id) => id !== value) })
    } else {
      setFilter({ [key]: "" })
    }
  }

  return (
    <div className="flex w-full justify-between">
      <div className="flex flex-wrap">
        {filters.map(({ key, value }) => (
          <Chip key={value} onRemove={() => handleRemove(key, value)} className="rounded-full">
            {value}
            <Icon name="IconCross" className="ml-1" size="1rem" />
          </Chip>
        ))}
      </div>

      <Button variant="outlined" className="self-baseline rounded-full whitespace-nowrap" onClick={clear}>
        {t("clear_all")}
        <Icon name="IconTrash" />
      </Button>
    </div>
  )
}
