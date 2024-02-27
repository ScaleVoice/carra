import { FC } from "react"

type Props = {
  label: string
  value: string
}

export const AttributeRowAlternative: FC<Props> = ({ label, value }) => {
  return (
    <div className="flex justify-between border-b border-gray-50">
      <span className="mb-1 block text-sm font-semibold text-gray-400">{label}</span>
      <span className="mb-1 block text-sm text-gray-600">{value}</span>
    </div>
  )
}
