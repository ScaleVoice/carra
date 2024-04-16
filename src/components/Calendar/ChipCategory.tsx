import { cva } from "class-variance-authority"
import { FC } from "react"
import { twMerge } from "tailwind-merge"
import { Chip } from "../Base/Chip"
import { EventType } from "./types"

const chipColorVariants = cva("", {
  variants: {
    color: {
      primary: ["text-primary", "border", "border-primary", "bg-transparent"],
      success: ["text-success", "border", "border-success", "bg-transparent"],
      warning: ["text-warning", "border", "border-warning", "bg-transparent"],
      custom: [""],
    },
  },
  defaultVariants: {
    color: "primary",
  },
})

interface Props {
  className?: string
  eventType?: EventType
}

export const ChipCategory: FC<Props> = ({ className, eventType }) => {
  if (!eventType) return null

  return (
    <Chip className={twMerge("m-0 cursor-default text-sm", chipColorVariants({ color: eventType.color }), className)}>
      {eventType.label}
    </Chip>
  )
}
