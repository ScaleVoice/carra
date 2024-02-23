import { FC } from "react"
import { Divider as RtuDivider } from "rtu-components"
import { twMerge } from "tailwind-merge"

export const Divider: FC<{ className?: string }> = ({ className }) => {
  return <RtuDivider className={twMerge(`bg-gray-50 ${className}`)} />
}
