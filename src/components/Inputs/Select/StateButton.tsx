import { LoadingSpinner } from "@/components/Base/Loading"
import { Icon } from "@/components/Icons"
import { Combobox } from "@headlessui/react"
import { FC } from "react"
import { twMerge } from "tailwind-merge"

interface StateButtonProps {
  className?: string
  isLoading?: boolean
  disabled?: boolean
  disableClear?: boolean
  value?: string | string[] | null | number
  onClick: () => void
  onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void
  LoadingIcon?: React.ReactNode
  ClearIcon?: React.ReactNode
  DefaultIcon?: React.ReactNode
}

export const StateButton: FC<StateButtonProps> = ({
  className,
  disabled,
  onClick,
  onKeyDown,
  isLoading,
  LoadingIcon,
  value,
  disableClear,
  ClearIcon = <Icon name="IconCross" size="1rem" className="text-gray" />,
  DefaultIcon = <Icon name="IconChevronDown" size="1rem" className="text-gray" />,
}) => {
  return (
    <Combobox.Button
      className={twMerge("hidden cursor-pointer", className, !disabled && "flex items-center justify-center")}
      // @ts-expect-error
      tabindex={0} // it needs to overide the default -1 so that the Combobox.Button can open the dropdown, yes it's lower case i, no don't change it
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <StateIcon
        value={value}
        disabled={disabled}
        disableClear={disableClear}
        loading={isLoading}
        ClearIcon={ClearIcon}
        DefaultIcon={DefaultIcon}
        LoadingIcon={LoadingIcon}
      />
    </Combobox.Button>
  )
}

interface RenderIconProps {
  value: StateButtonProps["value"]
  disabled: StateButtonProps["disabled"]
  disableClear?: StateButtonProps["disableClear"]
  loading: StateButtonProps["isLoading"]
  ClearIcon: StateButtonProps["ClearIcon"]
  DefaultIcon: StateButtonProps["DefaultIcon"]
  LoadingIcon?: StateButtonProps["LoadingIcon"]
}

export function StateIcon({
  value,
  disabled,
  disableClear,
  loading,
  ClearIcon,
  DefaultIcon,
  LoadingIcon,
}: RenderIconProps) {
  if (disabled) {
    return null
  } else if (loading) {
    return LoadingIcon ? <>{LoadingIcon}</> : <LoadingSpinner variant="dark" />
  } else if (Array.isArray(value)) {
    return value.length && !disableClear ? <>{ClearIcon}</> : <>{DefaultIcon}</>
  } else {
    return value && !disableClear ? <>{ClearIcon}</> : <>{DefaultIcon}</>
  }
}
