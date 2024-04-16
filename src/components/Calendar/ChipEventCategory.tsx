import { cva } from "class-variance-authority"
import { FC } from "react"
import { twMerge } from "tailwind-merge"
import { EventType } from "./types"

const chipColorVariants = cva("", {
  variants: {
    color: {
      primary: ["text-white", "bg-primary"],
      success: ["text-white", "bg-success"],
      warning: ["text-white", "bg-warning"],
      custom: [""],
    },
  },
  defaultVariants: {
    color: "primary",
  },
})

interface Props {
  className?: string
  eventType: EventType
}

export const ChipEventCategory: FC<Props> = ({ className, eventType }) => {
  return (
    <div
      className={twMerge(
        "flex w-fit shrink-0 cursor-default items-center justify-center rounded-md px-2 py-0.5 text-xs",
        chipColorVariants({ color: eventType.color }),
        className,
      )}
    >
      {eventType.label}
    </div>
  )
}
