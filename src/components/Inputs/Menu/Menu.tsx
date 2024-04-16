import { Icon } from "@/components/Icons"
import { ComponentVariantState, ComponentVariantType, getComponentStateVariants } from "@/css/variants/stateVariants"
import { Listbox } from "@headlessui/react"
import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"
import { StateIcon } from "../Select/StateButton"
import { Option } from "../types"

type Props = {
  error?: boolean
  name?: string
  label?: string
  renderLabel?: (label?: string) => JSX.Element
  value: Option["value"]
  onChange: (value: Option["value"]) => void
  options: Option[]
  placeholder?: string
}

export const Menu = forwardRef<HTMLDivElement, Props>(
  ({ error, name, value, label, renderLabel, onChange, options, placeholder }, ref) => {
    const { wrapperStateVariants } = getComponentStateVariants(
      ComponentVariantType.SELECT,
      error ? ComponentVariantState.ERROR : ComponentVariantState.DEFAULT,
    )

    const selectedOption = options.find((option) => option.value === value)

    return (
      <Listbox value={value} onChange={onChange} name={name} ref={ref}>
        {({ open }) => (
          <div className="flex flex-col [&>button]:focus-within:border-gray-200">
            {renderLabel ? renderLabel(label) : <label className="">{label}</label>}

            <Listbox.Button
              className={twMerge(
                "flex items-center justify-between gap-1 rounded-lg border border-gray-50 px-4 py-2.5 text-gray",
                wrapperStateVariants,
                open && "rounded-b-none",
                placeholder && !value && "text-gray-400",
              )}
            >
              {selectedOption ? selectedOption.label : placeholder}

              <StateIcon
                disableClear
                value={selectedOption?.value}
                disabled={undefined}
                loading={undefined}
                ClearIcon={<Icon name="IconCross" size="1rem" className="text-gray" />}
                DefaultIcon={<Icon name="IconChevronDown" size="1rem" className="text-gray" />}
              />
            </Listbox.Button>

            <div className="relative z-10 rounded-lg">
              <Listbox.Options
                className={twMerge(
                  "absolute top-0 w-full rounded-lg border border-gray-100 bg-white focus:border-gray-200",
                  open && "rounded-t-none border-t-0",
                )}
              >
                {options.map((option, i) => (
                  <Listbox.Option key={option.value} value={option.value} disabled={option.disabled}>
                    {({ active, selected }) => (
                      <div
                        className={twMerge(
                          "cursor-pointer border-b border-gray-50 px-4 py-2.5",
                          active && "bg-primary-25",
                          selected && "bg-primary-50",
                          i === options.length - 1 && "rounded-b-md",
                        )}
                      >
                        {option.label}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </div>
        )}
      </Listbox>
    )
  },
)

Menu.displayName = "Menu"
