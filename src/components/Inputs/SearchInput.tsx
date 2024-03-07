import { FC } from "react"
import { twMerge } from "tailwind-merge"
import { GRAY } from "tailwind.config"
import { Icon } from "../Icons"
import { Input, InputProps } from "./Input"

export const SearchInput: FC<InputProps> = ({ containerClassName, className, ...props }) => {
  return (
    <Input
      containerClassName={twMerge("rounded-full w-[320px] bg-gray-25 border-none", containerClassName)}
      className={twMerge("rounded-full bg-gray-25 pl-1", className)}
      renderLeft={(className) => (
        <div className={twMerge(className, "border-none")}>
          <Icon name="IconSearch" color={GRAY["DEFAULT"]} />
        </div>
      )}
      {...props}
    />
  )
}
