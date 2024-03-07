import { IconName } from "@/components/Icons"

export type Option = {
  value: string | number
  label: string
  disabled?: boolean
  icon?: IconName
}
