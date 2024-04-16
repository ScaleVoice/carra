import { DatePicker } from "@/components/Inputs/Datepicker/Datepicker"
import { InputField } from "@/components/Inputs/Input/InputField"
import { SelectBranch } from "@/components/Inputs/Select/SelectBranch"
import { SelectEmployee } from "@/components/Inputs/Select/SelectEmployee"
import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { EventModalKeys } from "./EventModal"
import { SelectCar } from "./SelectCar"

export const EventModalForm = () => {
  const { t } = useTranslation("appointments")

  return (
    <>
      <div className="flex w-full flex-col justify-start gap-3">
        <Controller
          name={EventModalKeys.TITLE}
          rules={{
            required: t("events_form_title_required"),
          }}
          render={({ field, fieldState }) => (
            <InputField
              {...field}
              error={fieldState.error?.message}
              label={t("events_form_title_label")}
              placeholder={t("events_form_title_label")}
            />
          )}
        />

        <div className="flex w-full justify-between">
          <label htmlFor="from" className="w-[48%]">
            <span className="text-gray">{t("events_form_start")}</span>
            <Controller name={EventModalKeys.START} render={({ field }) => <DatePicker {...field} showTimeInput />} />
          </label>

          <label htmlFor="to" className="w-[48%]">
            <span className="text-gray">{t("events_form_end")}</span>
            <Controller name={EventModalKeys.END} render={({ field }) => <DatePicker {...field} showTimeInput />} />
          </label>
        </div>
      </div>

      <div className="flex w-full flex-col justify-start gap-2">
        <SelectCar />

        <Controller name={EventModalKeys.BRANCH} render={({ field }) => <SelectBranch {...field} />} />

        <SelectEmployee />
      </div>
    </>
  )
}
