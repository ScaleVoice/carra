import { Icon } from "@/components/Icons"
import { Combobox } from "@headlessui/react"
import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"
import { Option } from "./types"

interface BaseSelectOptionsProps<O extends Option> {
  name?: string
  className?: string
  leftClassName?: string
  optionsClassName?: string
  optionClassName?: string
  options?: O[]
  selectedOptions?: O[]
  open: boolean
  transitionDuration: number
  renderOption?: (option: O, className?: string) => ReactNode
  onTransitionEnd?: () => void
}

export function BaseSelectOptions<O extends Option>({
  name,
  className,
  leftClassName,
  open,
  options,
  selectedOptions,
  optionsClassName,
  optionClassName,
  transitionDuration,
  renderOption,
  onTransitionEnd,
}: BaseSelectOptionsProps<O>) {
  return (
    <div className="relative">
      <Combobox.Options
        static
        className={twMerge(
          "transition-height absolute z-10 w-full overflow-auto overscroll-contain rounded-b-lg border border-gray-200 bg-white",
          open ? "max-h-60 rounded-t-none" : "max-h-0 border-0",
          optionsClassName,
        )}
        style={{ transitionDuration: `${transitionDuration * 2}ms` }}
        onTransitionEnd={onTransitionEnd}
      >
        {options?.map((option, i) => (
          <Combobox.Option
            disabled={option.value === null}
            key={`${name}-${option.label}-${i}`}
            value={option.value}
            className={twMerge(
              "flex items-center px-3 transition-transform duration-75 ease-in-out focus:scale-[99%] focus:rounded-lg ui-active:bg-primary-100",
              option.value ? "border-b p-3" : "pb-0 pt-3",
              i === options.length - 1 ? "border-none" : "",
              isHighlighted(option, selectedOptions) && "ui-not-active:bg-primary-50",
              className,
              optionClassName,
            )}
          >
            {option.value === null ? (
              <GroupLabel label={option.label} />
            ) : (
              <>
                {renderOption ? (
                  renderOption(option, leftClassName)
                ) : (
                  <DefaultOption option={option} className={leftClassName} />
                )}
              </>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </div>
  )
}

function isHighlighted(option: Option, selectedOptions?: Option[]) {
  return selectedOptions?.find((o) => o.value === option.value)
}

function GroupLabel({ label }: { label: string }) {
  return (
    <div className="text-gray-7 flex items-center text-sm">
      <span>{label}</span>
      <span className="flex-grow" />
    </div>
  )
}

interface DefaultOptionBaseSelectOptionsProps {
  option: Option
  className?: string
}

function DefaultOption({ option, className }: DefaultOptionBaseSelectOptionsProps) {
  const label = <span className="text-gray">{option.label}</span>

  if (option.icon) {
    return (
      <>
        <div className={className}>
          <Icon name={option.icon} />
        </div>
        {label}
      </>
    )
  }

  return label
}
