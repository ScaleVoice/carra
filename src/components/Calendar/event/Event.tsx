import { formatDate } from "@/utils/date"
import { FC } from "react"
import { EventProps } from "react-big-calendar"
import { twMerge } from "tailwind-merge"
import { ChipEventCategory } from "../ChipEventCategory"
import { CustomRBEvent } from "../types"
import { useEventTypes } from "../useEventTypes"

export const Event: FC<EventProps<CustomRBEvent>> = ({ event, title }) => {
  const { eventTypes } = useEventTypes()
  const eventType = eventTypes.find((x) => x.name === event.type?.name)

  if (!eventType) return null

  return (
    <div className="flex flex-col gap-1 p-1">
      <ChipEventCategory eventType={eventType} className="cursor-pointer" />

      <div>
        <div className={twMerge("overflow-hidden text-ellipsis whitespace-nowrap text-sm")}>{title}</div>

        {event.start && <span className={twMerge("text-xs")}>{formatDate(event.start, "HH:mm")}</span>}
      </div>
    </div>
  )
}
