import { Input, InputProps } from "@/components/Inputs/Input/Input"
import { FC } from "react"
import { twMerge } from "tailwind-merge"

type Props = InputProps & {
  containerClassName?: string
}

export const AttributeRow: FC<Props> = ({ containerClassName, name, label, value }) => {
  return (
    <label className={twMerge("w-[49%]", containerClassName)}>
      <span className="mb-1 block text-sm text-gray-400">{label}</span>
      <Input
        name={name}
        value={value}
        disabled
        label="Make"
        containerClassName="opacity-100 border-gray-50 bg-white"
        className="bg-white text-gray-600"
      />
    </label>
  )
}
