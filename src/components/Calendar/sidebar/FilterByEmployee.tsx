import { Button } from "@/components/Buttons/Button"
import { Icon } from "@/components/Icons"
import { Option } from "@/components/Inputs/types"
import { Popover } from "@/components/Popover/Popover"
import { FC } from "react"
import { useTranslation } from "react-i18next"

type Props = {
  employees: Option[]
}

export const FilterByEmployee: FC<Props> = ({ employees }) => {
  const { t } = useTranslation()
  const handleClick = () => {}

  return (
    <Popover
      asChild
      orientation="right"
      align="start"
      trigger={
        <Button variant="outlined" className="w-full justify-between px-6" onClick={handleClick}>
          <span>{t("filter_by_employee")}</span>
          <Icon name="IconChevronDown" size="0.75rem" />
        </Button>
      }
    >
      <div className="relative -right-1 top-2 flex min-w-[200px] flex-col rounded-md bg-white text-gray-400 shadow-xl">
        {employees.map((employee) => {
          return (
            <Button
              key={employee.value}
              variant="custom"
              size="normal"
              className="flex w-full items-center justify-start rounded-none p-4 text-black hover:bg-gray-25"
            >
              {employee.label}
            </Button>
          )
        })}
      </div>
    </Popover>
  )
}
