import { FC, PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from "react"
import { View, Views } from "react-big-calendar"
import { useEvents } from "./useEvents"

type CalendarContextValue = ReturnType<typeof useEvents> &
  CalendarOptions & { setView: (view: CalendarOptions["view"]) => void; setDate: (date: Date) => void }

export const CalendarContext = createContext<CalendarContextValue | null>(null)

export function useCalendarContext() {
  const context = useContext(CalendarContext)

  if (context === undefined) {
    throw new Error("No context for Calendar provided")
  }

  return context as CalendarContextValue
}

type CalendarOptions = {
  view: View
  date: Date
}

export const CalendarProvider: FC<PropsWithChildren> = ({ children }) => {
  const events = useEvents()
  const [options, setOptions] = useState<CalendarOptions>({
    view: Views.WEEK,
    date: new Date(),
  })
  const setView = useCallback((view: CalendarOptions["view"]) => {
    setOptions((prev) => ({
      ...prev,
      view,
    }))
  }, [])

  const setDate = useCallback((date: Date) => {
    setOptions((prev) => ({
      ...prev,
      date,
    }))
  }, [])

  const value = useMemo(
    () => ({
      ...events,
      ...options,
      setDate,
      setView,
    }),
    [events, options, setView, setDate],
  )

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>
}
