import { components } from "@/api/generated/lov"
import {
  addHours,
  eachDayOfInterval,
  eachMinuteOfInterval,
  format,
  isEqual,
  isWithinInterval,
  parse,
  set,
  startOfHour,
  subHours,
} from "date-fns"
import { stringOrDate } from "react-big-calendar"
import { DateWithSlotsProps, SlotProps } from "./slot/Slot.utils"

function roundToHour(date: Date) {
  const p = 60 * 60 * 1000 // milliseconds in an hour
  return new Date(Math.round(date.getTime() / p) * p)
}

export type CalendarOpeningHours = Record<
  string,
  | {
      from: Date
      to: Date
    }
  | never
>

type DateWithSlotsPropsWithoutState = {
  date: string
  slots: Omit<SlotProps, "state">[]
}

export function getOpeningDays(openingHours: CalendarOpeningHours) {
  return Object.fromEntries(
    Object.entries(openingHours ?? {}).filter(([_key, hours]) => {
      return hours && !isEqual(hours.from, hours.to)
    }),
  )
}

export function mapDaysToDates(
  dateFrom: Date,
  dateTo: Date,
  openingHours?: components["schemas"]["BranchOpeningHourResponse"][],
): CalendarOpeningHours {
  const days = eachDayOfInterval({
    start: dateFrom,
    end: dateTo,
  })

  return days?.reduce((acc, cur) => {
    const foundDay = openingHours?.find((x) => x.day === format(cur, "EEEE").toUpperCase())

    return {
      ...acc,
      [format(cur, "yyyy-MM-dd")]: {
        from: foundDay?.from ? subHours(parse(foundDay.from, "HH:mm", cur), 1) : subHours(cur, 1),
        to: foundDay?.to ? parse(foundDay.to, "HH:mm", cur) : cur,
      },
    }
  }, {})
}

export function getMinAndMaxOpeningHours(openingHours?: CalendarOpeningHours) {
  if (openingHours) {
    const today = new Date()

    const openingHoursList = Object.values(openingHours)

    const min = Math.min(...openingHoursList.map((x) => parseInt(format(startOfHour(x.from), "HH"))))
    const max = Math.max(...openingHoursList.map((x) => parseInt(format(roundToHour(x.to), "HH"))))

    return {
      min: Number.isInteger(min) ? new Date(today.getFullYear(), today.getMonth(), today.getDate(), min) : undefined,
      max: Number.isInteger(max) ? new Date(today.getFullYear(), today.getMonth(), today.getDate(), max) : undefined,
    }
  }

  return {}
}

export function getOpeningHoursForDate(openingHours: CalendarOpeningHours, date: Date) {
  const day = format(date, "yyyy-MM-dd")

  return openingHours[day] ?? false
}

export function isTimeGutter(resource?: string | number) {
  return typeof resource === "undefined"
}

type RangeDates = { start: stringOrDate; end: stringOrDate }

export function isRangeDateArray(range: Date[] | RangeDates): range is Date[] {
  return typeof (range as RangeDates).start === "undefined"
}

export function mapDaysToSlotsWithOpening(start: Date, end: Date) {
  const extendedSlots = eachMinuteOfInterval(
    {
      start: roundToHour(start),
      end,
    },
    {
      step: 30,
    },
  ).filter((slot) =>
    isWithinInterval(slot, {
      start: set(slot, {
        hours: start.getHours(),
      }),
      end: set(slot, {
        hours: end.getHours(),
      }),
    }),
  )

  return extendedSlots.reduce((acc: DateWithSlotsPropsWithoutState[], cur) => {
    const day = format(cur, "yyyy-MM-dd")
    const foundIndex = acc.findIndex((x) => x.date === day)

    const from = format(cur, "HH:mm:ss")
    const to = format(addHours(cur, 1), "HH:mm:ss")

    if (foundIndex !== -1) {
      acc[foundIndex].slots.push({
        from,
        to,
      })

      return acc
    }

    acc.push({
      date: day,
      slots: [
        {
          from,
          to,
        },
      ],
    })

    return acc
  }, [])
}

function generateUniqueSlotId(slot: SlotProps) {
  return `${slot.from}-${slot.to}`
}

function mergeSlots(...args: SlotProps[][]) {
  return args.reduce((acc, cur) => {
    cur.forEach((slot) => {
      const foundIndex = acc.findIndex((slotAcc) => generateUniqueSlotId(slotAcc) === generateUniqueSlotId(slot))
      if (foundIndex !== -1) {
        acc[foundIndex] = slot
        return
      }
      acc.push(slot)
    })
    return acc
  }, [])
}

export function mergeDaysWithSlots(...args: DateWithSlotsProps[][]) {
  return args.reduce((acc, cur) => {
    cur.forEach((day) => {
      const foundIndex = acc.findIndex((dayAcc) => dayAcc.date === day.date)
      if (foundIndex !== -1) {
        acc[foundIndex] = {
          ...day,
          slots: mergeSlots(acc[foundIndex]["slots"], day.slots),
        }
        return
      }
      acc.push(day)
    })

    return acc
  }, [])
}
