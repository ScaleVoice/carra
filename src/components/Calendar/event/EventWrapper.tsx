import { PropsWithChildren } from "react"
import { EventWrapperProps } from "react-big-calendar"
import { CustomRBEvent } from "../types"

export function EventWrapper(props: EventWrapperProps<CustomRBEvent> & PropsWithChildren) {
  return <div className="flex flex-col h-20">{props.children}</div>
}
