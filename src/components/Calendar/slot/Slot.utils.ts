import { components } from "@/api/generated/appointments"
import { format, isAfter, isBefore, isEqual, isWithinInterval, parse } from "date-fns"
import { CalendarOpeningHours, getOpeningHoursForDate } from "../Calendar.utils"

export type BookingUnavailability = components["schemas"]["BookingUnavailabilityResponse"]

export interface SlotProps {
  from: string
  to: string
  state: components["schemas"]["AdminBookingSlotResponse"]["state"]
  bookingUnavailabilities?: BookingUnavailability[]
}

export interface DateWithSlotsProps {
  date: string
  slots: SlotProps[]
}

export function isSlotUnavailable(slots: DateWithSlotsProps[], date: Date) {
  const day = slots.find((x) => x.date === format(date, "yyyy-MM-dd"))
  if (!day) {
    return true
  }

  const possibleSlots = day.slots.filter((x) => {
    const from = parse(x.from, "HH:mm:ss'", date)
    const to = parse(x.to, "HH:mm:ss'", date)
    return isEqual(date, from) || isEqual(date, to)
  })
  return (
    possibleSlots.filter((possibleSlot) => possibleSlot.state === "UNAVAILABLE").length > 0 ||
    isBefore(date, new Date())
  )
}

export function isClosed(openingHours: CalendarOpeningHours, date: Date) {
  const dayOpeningHours = getOpeningHoursForDate(openingHours, date)

  if (dayOpeningHours) {
    return (
      !isWithinInterval(date, {
        start: dayOpeningHours.from,
        end: dayOpeningHours.to,
      }) || isEqual(date, dayOpeningHours.to)
    )
  }

  return true
}

function isSlotClosed(openingHours: CalendarOpeningHours, date: Date) {
  const dayOpeningHours = getOpeningHoursForDate(openingHours, date)

  if (dayOpeningHours) {
    return (
      !isWithinInterval(date, {
        start: dayOpeningHours.from,
        end: dayOpeningHours.to,
      }) || isAfter(date, dayOpeningHours.to)
    )
  }

  return true
}

export function couldBookOverSlots(
  openingHours: CalendarOpeningHours,
  allSlots: DateWithSlotsProps[],
  slots: Date[] | string[],
) {
  const slotsDates = slots.map((x) => (typeof x === "string" ? new Date(x) : x))

  const notPossibleSlots = slotsDates.filter((x) => isSlotClosed(openingHours, x) || isSlotUnavailable(allSlots, x))
  return notPossibleSlots.length === 0
}
