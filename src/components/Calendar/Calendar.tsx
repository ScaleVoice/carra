import { format, getDay, parse, setDate, startOfWeek } from "date-fns"
import enGB from "date-fns/locale/en-GB"
import { CalendarProps, Calendar as RBCalendar, dateFnsLocalizer } from "react-big-calendar"

import { Header } from "./header/Header"
import { DateWithSlotsProps, isClosed, isSlotUnavailable } from "./slot/Slot.utils"
import { CalendarToolbar } from "./toolbar/Toolbar"

import { CalendarOpeningHours, getMinAndMaxOpeningHours, isTimeGutter } from "./Calendar.utils"
import { useCalendarContext } from "./CalendarProvider"
import { Event } from "./event/Event"
import { EventModal } from "./event/EventModal"
import { CustomRBEvent } from "./types"

const locales = {
  "en-GB": enGB,
}

const defaultLocalizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface CalendarOuterProps extends CalendarProps<CustomRBEvent> {
  openingDaysWithHours?: CalendarOpeningHours
  slots?: DateWithSlotsProps[]
  // renderContent?: boolean
}

export function Calendar({
  localizer,
  openingDaysWithHours,
  slots,
  defaultView = "day",
  className,
  ...props
}: CalendarOuterProps) {
  const minAndMaxOpeningHours = getMinAndMaxOpeningHours(openingDaysWithHours)
  const { events, selectedEvent, setSelectedEvent, view, setView, date, setDate } = useCalendarContext()

  return (
    <div className={className}>
      <RBCalendar
        localizer={localizer ?? defaultLocalizer}
        culture="en-GB"
        view={view}
        date={date}
        selected={selectedEvent}
        min={minAndMaxOpeningHours.min}
        max={minAndMaxOpeningHours.max}
        onSelectEvent={(event) => setSelectedEvent(event)}
        onNavigate={setDate}
        // dayLayoutAlgorithm="no-overlap"
        formats={{
          timeGutterFormat: (date, culture, localizer) => {
            if (localizer) {
              return localizer.format(date, "H:mm", culture ?? "en-GB")
            }
            return format(date, "H:mm")
          },
        }}
        eventPropGetter={(event) => {
          const extraClasses: string[] = []

          if (event.type) {
            extraClasses.push(event.type.name) // calendar.css defines the classes
          }

          return {
            className: extraClasses.join(" "),
          }
        }}
        dayPropGetter={(date) => {
          const extraClasses: string[] = []
          return {
            className: extraClasses.join(" "),
          }
        }}
        slotPropGetter={(date: Date, resource) => {
          const extraClasses: string[] = [""]

          if (openingDaysWithHours && !isTimeGutter(resource)) {
            const isSlotClosed = isClosed(openingDaysWithHours, date)
            if (isSlotClosed) {
              extraClasses.push("__closed")
            } else {
              if (slots && isSlotUnavailable(slots, date)) {
                extraClasses.push("__unavailable")
              }
            }
          }

          return {
            className: extraClasses.join(" "),
          }
        }}
        components={{
          toolbar: CalendarToolbar,
          event: Event,
          header: (props) => <Header {...props} openingDays={openingDaysWithHours} />,
        }}
        events={events}
        {...props}
      />

      {selectedEvent && (
        <EventModal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          event={selectedEvent}
          editing={selectedEvent.meta?.editing}
        />
      )}
    </div>
  )
}
