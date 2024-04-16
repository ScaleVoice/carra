import { useBranchDetail } from "@/api/useBranch"
import { useCarDetail } from "@/api/useCarDetail"
import { employees } from "@/api/useEmployeeSearch"
import { useCallback, useEffect, useState } from "react"
import { CustomRBEvent, EventTypes } from "./types"
import { useEventTypes } from "./useEventTypes"

export const useEvents = () => {
  const { eventTypes, setEventTypes } = useEventTypes()
  const branch = useBranchDetail("123ABC")
  const car = useCarDetail("123e4567-e89b-12d3-a456-426614174000")
  const employee = employees.find((c) => c.value === 1)
  const [selectedEvent, setSelectedEvent] = useState<CustomRBEvent | null>(null)

  useEffect(() => {
    if (!car) return

    setEvents((prev) => {
      return prev.map((event) => {
        return {
          ...event,
          car,
        }
      })
    })
  }, [car])

  useEffect(() => {
    if (!branch) return

    setEvents((prev) => {
      return prev.map((event) => {
        return {
          ...event,
          branch,
        }
      })
    })
  }, [branch])

  useEffect(() => {
    if (!employee) return

    setEvents((prev) => {
      return prev.map((event) => {
        return {
          ...event,
          employee,
        }
      })
    })
  }, [employee])

  const [events, setEvents] = useState<CustomRBEvent[]>([
    {
      id: "1",
      title: "Test 1",
      start: new Date(),
      end: new Date(Date.now() + 1000 * 60 * 60),
      type: eventTypes.find((c) => c.name === EventTypes.Buying),
      branch,
      car,
      employee,
      // allDay: true,
    },
    {
      id: "2",
      title: "Test with long title",
      start: new Date(Date.now() + 1000 * 60 * 60),
      end: new Date(Date.now() + 1000 * 60 * 120),
      type: eventTypes.find((c) => c.name === EventTypes.Delivery),
      branch,
      car,
      employee,
      // allDay: true,
    },
    {
      id: "3",
      title: "Test with even longer title",
      start: new Date(Date.now() + 1000 * 60 * 120),
      end: new Date(Date.now() + 1000 * 60 * 180),
      type: eventTypes.find((c) => c.name === EventTypes.Reclamation),
      branch,
      car,
      employee,
      // allDay: true,
    },
    {
      id: "4",
      title: "Test 4",
      start: new Date(),
      end: new Date(Date.now() + 1000 * 60 * 120),
      type: eventTypes.find((c) => c.name === EventTypes.Buying),
      branch,
      car,
      employee,
      // allDay: true,
    },
  ])

  const updateEvent = useCallback(
    (event: Partial<CustomRBEvent>) => {
      setEvents(
        events.map((x) =>
          x.id === event.id
            ? {
                ...x,
                ...event,
              }
            : x,
        ),
      )
    },
    [events],
  )

  const addEvent = useCallback(
    (event: CustomRBEvent) => {
      setEvents((prev) => {
        return [...prev, event]
      })
    },
    [setEvents],
  )

  const toggleEventType = useCallback(
    (eventType: EventTypes) => {
      setEventTypes((prev) => {
        const newEventTypes = prev.map((c) => {
          if (c.name === eventType) {
            return {
              ...c,
              checked: !c.checked,
            }
          }
          return c
        })

        return newEventTypes
      })
    },
    [setEventTypes],
  )

  return {
    events: events.filter((event) => {
      return eventTypes.find((category) => category.name === event.type?.name)?.checked
    }),
    eventTypes,
    toggleEventType,
    updateEvent,
    selectedEvent,
    setSelectedEvent,
    addEvent,
  }
}
