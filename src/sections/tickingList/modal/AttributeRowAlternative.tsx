import { FC } from "react"
import { twMerge } from "tailwind-merge"

type Props = {
  label: string
  value: string
  className?: string
}

export const AttributeRowAlternative: FC<Props> = ({ label, value, className }) => {
  return (
    <div className={twMerge("flex justify-between border-b border-gray-50", className)}>
      <span className="mb-1 block text-sm font-semibold text-gray-400">{label}</span>
      <span className="mb-1 block text-sm text-gray-600">{value}</span>
    </div>
  )
}
