"use client"

import { format, getDay, parse, startOfWeek } from "date-fns"
import enGB from "date-fns/locale/en-GB"
import { dateFnsLocalizer } from "react-big-calendar"

import { Calendar } from "@/components/Calendar/Calendar"
import { CalendarProvider } from "@/components/Calendar/CalendarProvider"
import { Sidebar } from "@/components/Calendar/sidebar/Sidebar"
import { Header } from "@/components/Header/Header"
import { CalendarLayout } from "@/components/Layout/CalendarLayout"

export default function Page({ params }) {
  const defaultLocalizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: params.locale ?? { "en-GB": enGB },
  })

  return (
    <main>
      <Header />

      <CalendarProvider>
        <CalendarLayout>
          <Sidebar />

          <div className="flex-grow px-10 py-6">
            <Calendar localizer={defaultLocalizer} className="h-full" />
          </div>
        </CalendarLayout>
      </CalendarProvider>
    </main>
  )
}
