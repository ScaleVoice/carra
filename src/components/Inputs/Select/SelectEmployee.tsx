import { useEmployeeOptions, useEmployeeSearch } from "@/api/useEmployeeSearch"
import { EventModalKeys } from "@/components/Calendar/event/EventModal"
import { ControlledSelectField } from "@/components/Controlled/SelectField"
import { useTranslation } from "react-i18next"

export const SelectEmployee = () => {
  const { t } = useTranslation("appointments")
  const { data } = useEmployeeSearch()
  const options = useEmployeeOptions(data)

  return (
    <ControlledSelectField
      name={EventModalKeys.EMPLOYEE}
      options={options}
      placeholder={t("events_form_employee_placeholder")}
    />
  )
}
