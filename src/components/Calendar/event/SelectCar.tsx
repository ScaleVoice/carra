import { useTickingListData, useTickingListOptions } from "@/api/useSearch"
import { ControlledSelectField } from "@/components/Controlled/SelectField"
import { useTranslation } from "react-i18next"
import { EventModalKeys } from "./EventModal"

export const SelectCar = () => {
  const { t } = useTranslation("appointments")
  const { data } = useTickingListData({})
  const options = useTickingListOptions(data?.content)

  return (
    <ControlledSelectField name={EventModalKeys.CAR} options={options} placeholder={t("events_form_car_placeholder")} />
  )
}
