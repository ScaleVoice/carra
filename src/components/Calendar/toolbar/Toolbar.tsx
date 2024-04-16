import { ButtonRound } from "@/components/Buttons/ButtonRound"
import { Icon } from "@/components/Icons"
import { Menu } from "@/components/Inputs/Menu/Menu"
import { ToolbarProps, Views } from "react-big-calendar"
import { useTranslation } from "react-i18next"
import { useCalendarContext } from "../CalendarProvider"

export function CalendarToolbar({ label, onNavigate }: ToolbarProps) {
  const { t } = useTranslation("appointments")
  const { view, setView } = useCalendarContext()

  return (
    <div className="mb-6 flex justify-end gap-6">
      <div>
        <div className="flex items-center justify-between gap-8">
          <ButtonRound variant="outlined" onClick={() => onNavigate("PREV")}>
            <Icon name="ArrowLeft" />
          </ButtonRound>
          <div>{label}</div>
          <ButtonRound variant="outlined" onClick={() => onNavigate("NEXT")}>
            <Icon name="ArrowRight" />
          </ButtonRound>
        </div>
      </div>

      <Menu
        onChange={setView}
        value={view}
        options={[
          { value: Views.DAY, label: t("calendar_view_day") },
          { value: Views.WEEK, label: t("calendar_view_week") },
          { value: Views.MONTH, label: t("calendar_view_month") },
          { value: Views.AGENDA, label: t("calendar_view_agenda") },
        ]}
      />
    </div>
  )
}
