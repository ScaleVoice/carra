/* eslint-disable max-lines */
/* eslint-disable curly */
import { forwardRef, Ref } from "react"

import ArrowDown from "./ArrowDown"
import ArrowLeft from "./ArrowLeft"
import ArrowRight from "./ArrowRight"
import ArrowUp from "./ArrowUp"
import ChevronRightDouble from "./ChevronRightDouble"
import IconAppointments from "./IconAppointments"
import IconArrowDropDown from "./IconArrowDropDown"
import IconArrowDropUp from "./IconArrowDropUp"
import IconAuctions from "./IconAuctions"
import IconCallCustomer from "./IconCallCustomer"
import IconCheck from "./IconCheck"
import IconChevronDown from "./IconChevronDown"
import IconChevronRight from "./IconChevronRight"
import IconCircle from "./IconCircle"
import IconCircleCheck from "./IconCircleCheck"
import IconCirclePlus from "./IconCirclePlus"
import IconClearAll from "./IconClearAll"
import IconClose from "./IconClose"
import IconCopy from "./IconCopy"
import IconCross from "./IconCross"
import IconDoubleChevronLeft from "./IconDoubleChevronLeft"
import IconError from "./IconError"
import IconExternalLink from "./IconExternalLink"
import IconHistory from "./IconHistory"
import IconLogout from "./IconLogout"
import IconNotAllowed from "./IconNotAllowed"
import IconSearch from "./IconSearch"
import IconSelectDropdown from "./IconSelectDropdown"
import IconSelectedOption from "./IconSelectedOption"
import IconSliders from "./IconSliders"
import IconSuccess from "./IconSuccess"
import IconTrades from "./IconTrades"
import IconTrash from "./IconTrash"
import PhoneOutgoing01 from "./PhoneOutgoing01"
import PhoneX from "./PhoneX"
import Star01 from "./Star01"

export type IconName =
  | "IconAppointments"
  | "IconArrowDropDown"
  | "IconArrowDropUp"
  | "IconAuctions"
  | "IconCallCustomer"
  | "IconCheck"
  | "IconChevronDown"
  | "IconChevronRight"
  | "IconCircle"
  | "IconCircleCheck"
  | "IconCirclePlus"
  | "IconClearAll"
  | "IconClose"
  | "IconCopy"
  | "IconCross"
  | "IconDoubleChevronLeft"
  | "IconError"
  | "IconExternalLink"
  | "IconHistory"
  | "IconLogout"
  | "IconNotAllowed"
  | "IconSearch"
  | "IconSelectDropdown"
  | "IconSelectedOption"
  | "IconSliders"
  | "IconSuccess"
  | "IconTrades"
  | "IconTrash"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "ArrowUp"
  | "ChevronLeftDouble"
  | "ChevronRightDouble"
  | "PhoneOutgoing01"
  | "PhoneX"
  | "Star01"

const icons = {
  IconAppointments,
  IconArrowDropDown,
  IconArrowDropUp,
  IconAuctions,
  IconCallCustomer,
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconCircle,
  IconCircleCheck,
  IconCirclePlus,
  IconClearAll,
  IconClose,
  IconCopy,
  IconCross,
  IconDoubleChevronLeft,
  IconError,
  IconExternalLink,
  IconHistory,
  IconLogout,
  IconNotAllowed,
  IconSearch,
  IconSelectDropdown,
  IconSelectedOption,
  IconSliders,
  IconSuccess,
  IconTrades,
  IconTrash,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ChevronRightDouble,
  PhoneOutgoing01,
  PhoneX,
  Star01,
}

export const IconNameSet = new Set(Object.keys(icons))

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "ref"> {
  name: IconName
  size?: number | string
}

const _Icon = (props: IconProps, ref: Ref<SVGSVGElement>) => {
  const { name, size = "1.25rem", width, height, ...rest } = props

  const IconComponent = icons[name]

  if (!IconComponent) return null
  return (
    <IconComponent
      aria-label={name}
      width={width ?? size}
      height={height ?? size}
      style={{ flexShrink: 0 }}
      {...rest}
      ref={ref}
    />
  )
}

export const Icon = forwardRef(_Icon)
