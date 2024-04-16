import { Button } from "@/components/Buttons/Button"
import { Icon } from "@/components/Icons"
import { Popover } from "@/components/Popover/Popover"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useCalendarContext } from "../CalendarProvider"
import { EventType } from "../types"

type Props = {
  eventTypes: EventType[]
}

export const CreateNew: FC<Props> = ({ eventTypes }) => {
  const { t } = useTranslation()
  const { setSelectedEvent } = useCalendarContext()

  const handleClick = (eventType: EventType) => {
    setSelectedEvent({
      id: "placeholder",
      type: eventType,
      meta: {
        editing: true,
        isNew: true,
      },
    })
  }

  return (
    <>
      <Popover
        asChild
        modal
        orientation="right"
        align="start"
        trigger={
          <Button variant="primary" className="w-full justify-between px-6">
            <span>{t("create_new")}</span>
            <Icon name="IconChevronDown" size="0.75rem" />
          </Button>
        }
      >
        <div className="relative -right-1 top-2 z-20 flex min-w-[200px] flex-col rounded-md bg-white text-gray-400 shadow-xl">
          {eventTypes.map((eventType) => {
            return (
              <Button
                key={eventType.name}
                variant="custom"
                size="normal"
                className="flex w-full items-center justify-start rounded-none p-4 text-black hover:bg-gray-25"
                onClick={() => handleClick(eventType)}
              >
                {eventType.label}
              </Button>
            )
          })}
        </div>
      </Popover>
    </>
  )
}
