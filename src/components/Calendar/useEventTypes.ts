import { useState } from "react"
import { useTranslation } from "react-i18next"
import { EventType, EventTypes } from "./types"

export const eventTypeOptions = [EventTypes.Buying, EventTypes.Delivery, EventTypes.Reclamation]

export function getColorForEventType(category: EventTypes, modifier: string = "") {
  switch (category) {
    case EventTypes.Buying:
      return `primary${modifier}` as "primary"
    case EventTypes.Delivery:
      return `success${modifier}` as "success"
    case EventTypes.Reclamation:
      return `warning${modifier}` as "warning"
  }
}

export function useEventTypes() {
  const { t } = useTranslation("appointments")

  const [eventTypes, setEventTypes] = useState<EventType[]>(
    eventTypeOptions.map((type) => ({
      name: type,
      checked: true,
      label: t(`calendar_${type}`),
      color: getColorForEventType(type),
    })),
  )

  return { eventTypes, setEventTypes }
}
