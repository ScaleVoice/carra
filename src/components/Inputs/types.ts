import { IconName } from "@/components/Icons"
import { FieldValues, RegisterOptions } from "react-hook-form"

export type Option = {
  value: string | number | null
  label: string
  disabled?: boolean
  icon?: IconName
}

export interface SelectCategory {
  label: string
  items: string[]
}

export type Validation = {
  rules: Omit<RegisterOptions<FieldValues, string>, "setValueAs" | "valueAsNumber" | "valueAsDate"> | undefined
}
