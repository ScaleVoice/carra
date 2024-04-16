import { Branch } from "@/api/useBranch"
import { TickingItem } from "@/api/useSearch"
import { ParseKeys } from "i18next"
import { Event } from "react-big-calendar"

export enum EventTypes {
  Buying = "buying",
  Delivery = "delivery",
  Reclamation = "reclamation",
}

export type EventType = {
  name: EventTypes
  checked: boolean
  label: ParseKeys<"common">
  color: "primary" | "success" | "warning" // tw-class
}

export interface CustomRBEvent extends Event {
  id?: string
  type?: EventType
  title?: string
  car?: TickingItem
  branch?: Branch
  employee?: { value: number; name: string }
  meta?: {
    editing?: boolean
    isNew?: boolean
  }
}
