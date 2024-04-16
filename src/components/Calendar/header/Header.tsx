import { Text } from "@/components/Text"
import { HeaderProps } from "react-big-calendar"
import { CalendarOpeningHours, getOpeningHoursForDate } from "../Calendar.utils"

interface HeaderOuterProps extends HeaderProps {
  openingDays?: CalendarOpeningHours
}

export function Header(props: HeaderOuterProps) {
  const isOpen = getOpeningHoursForDate(props.openingDays ?? {}, props.date)

  return (
    <div className="align-center flex flex-col justify-center">
      <Text>{props.localizer.format(props.date, "E", "en-GB")}</Text>
      <Text size="xl">{props.localizer.format(props.date, "dd", "en-GB")}</Text>
    </div>
  )
}
