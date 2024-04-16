import { useEmployeeOptions, useEmployeeSearch } from "@/api/useEmployeeSearch"
import { CheckboxField } from "@/components/Inputs/Checkbox/CheckboxField"
import { Text } from "@/components/Text"
import { ChangeEvent } from "react"
import { useCalendarContext } from "../CalendarProvider"
import { EventTypes } from "../types"
import { CreateNew } from "./CreateNew"
import { FilterByEmployee } from "./FilterByEmployee"

export const Sidebar = () => {
  const { eventTypes, toggleEventType } = useCalendarContext()
  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    toggleEventType(e.target.name as EventTypes)
  }
  const { data } = useEmployeeSearch()
  const employees = useEmployeeOptions(data)

  return (
    <div className="flex h-screen w-80 flex-col gap-3 border-r border-gray-50 p-6">
      <CreateNew eventTypes={eventTypes} />

      <FilterByEmployee employees={employees} />

      <Text size="xs" className="uppercase">
        Appointments
      </Text>

      <div className="flex flex-col gap-2">
        {eventTypes.map((category) => {
          return (
            <CheckboxField
              key={category.name}
              name={category.name}
              checked={category.checked}
              onChange={handleCategoryChange}
              label={category.label}
              color={category.color}
              size="large"
            />
          )
        })}
      </div>
    </div>
  )
}
