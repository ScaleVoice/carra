import { ComponentVariantState, ComponentVariantType, getComponentStateVariants } from "@/css/variants/stateVariants"
import { Combobox } from "@headlessui/react"
import { ForwardedRef, HTMLProps, ReactNode, forwardRef, useCallback, useMemo } from "react"
import { twMerge } from "tailwind-merge"
import { Option } from "../types"
import { BaseSelectOptions } from "./BaseSelectOptions"
import { StateButton } from "./StateButton"
import { SelectVariants, selectSideItemVariants, selectSizeVariants } from "./variantClassNames"

export type SelectProps = Omit<HTMLProps<HTMLInputElement>, "value" | "onChange" | "ref" | "size"> &
  SelectVariants & {
    isLoading?: boolean
    disabled?: boolean
    disableClear?: boolean
    options: Option[]
    selectedOptions?: Option[]
    value: string | null | number
    name: string
    inputClassName?: string
    containerClassName?: string
    optionsClassName?: string
    optionClassName?: string
    placeholder?: string
    error?: boolean
    onChange: (value: string) => void
    setQuery?: (query: string) => void
    clear: () => void
    transitionDuration?: number
    LoadingIcon?: ReactNode
    ClearIcon?: ReactNode
    DefaultIcon?: ReactNode
    renderOption?: (option: Option) => ReactNode
    renderLeft?: (option?: Option, className?: string, error?: boolean) => ReactNode
  }

export const Select = forwardRef(
  (
    {
      isLoading,
      disabled,
      options,
      selectedOptions,
      disableClear,
      value,
      name,
      placeholder,
      inputClassName,
      containerClassName,
      optionsClassName,
      optionClassName,
      error,
      onChange,
      setQuery,
      clear,
      size,
      transitionDuration = 150,
      LoadingIcon,
      ClearIcon,
      DefaultIcon,
      renderOption,
      renderLeft,
    }: SelectProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const { wrapperStateVariants, inputStateVariants } = getComponentStateVariants(
      ComponentVariantType.SELECT,
      error ? ComponentVariantState.ERROR : ComponentVariantState.DEFAULT,
    )
    const sizeVariants = selectSizeVariants({ size })
    const sideItemVariantsLeft = selectSideItemVariants({
      size,
      orientation: "left",
    })
    const sideItemVariantsRight = selectSideItemVariants({
      size,
      orientation: "right",
    })

    const selectedOption = useMemo(() => options?.find((o) => o.value === value), [options, value])

    const onClick = useCallback(() => {
      if (!value || isLoading || disableClear) {
        return
      }
      setTimeout(() => {
        clear()
      }, transitionDuration)
    }, [value, isLoading, disableClear, transitionDuration, clear])

    const onKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (!value || isLoading || disableClear) {
          return false
        }
        if (e.key === "Enter" || e.key === "Space") {
          setTimeout(() => {
            clear()
          }, transitionDuration)
        }

        return true
      },
      [value, isLoading, disableClear, transitionDuration, clear],
    )

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setQuery?.(value)

        if (!value) {
          onChange(value)
        }
      },
      [onChange, setQuery],
    )

    const onTransitionEnd = useCallback(() => {
      // user didn't select any option, clearing the query
      setTimeout(() => {
        setQuery?.("")
      }, transitionDuration)
    }, [setQuery, transitionDuration])

    return (
      <Combobox nullable value={value || null} onChange={onChange}>
        {({ open }) => (
          <div className="group">
            <Combobox.Button
              as="div"
              className={twMerge(
                "flex w-full items-center",
                sizeVariants,
                wrapperStateVariants,
                open ? "rounded-b-none" : "rounded-b-lg",
                disabled && "pointer-events-none opacity-40",
                containerClassName,
              )}
            >
              {renderLeft ? (
                <>{renderLeft(selectedOption, sideItemVariantsLeft, error)}</>
              ) : (
                <DefaultSelectedOption selectedOption={selectedOption} className={sideItemVariantsLeft} />
              )}

              <Combobox.Input
                name={name}
                ref={ref}
                onChange={handleInputChange}
                className={twMerge("peer flex-grow appearance-none outline-none", inputStateVariants, inputClassName)}
                placeholder={placeholder}
                displayValue={(value: string) => {
                  return options?.find((o) => String(o.value) === value)?.label || ""
                }}
              />

              <StateButton
                className={twMerge(
                  "hidden cursor-pointer",
                  sideItemVariantsRight,
                  !disabled && "flex items-center justify-center",
                )}
                value={value}
                disabled={disabled}
                disableClear={disableClear}
                isLoading={isLoading}
                onClick={onClick}
                onKeyDown={onKeyDown}
                ClearIcon={ClearIcon}
                DefaultIcon={DefaultIcon}
                LoadingIcon={LoadingIcon}
              />
            </Combobox.Button>

            <BaseSelectOptions
              name={name}
              open={open}
              options={options}
              className={sizeVariants}
              leftClassName={sideItemVariantsLeft}
              selectedOptions={selectedOptions}
              transitionDuration={transitionDuration}
              renderOption={renderOption}
              onTransitionEnd={onTransitionEnd}
              optionsClassName={optionsClassName}
              optionClassName={optionClassName}
            />
          </div>
        )}
      </Combobox>
    )
  },
)

Select.displayName = "Select"

function DefaultSelectedOption({ selectedOption, className }: { selectedOption?: Option; className?: string }) {
  if (!selectedOption) {
    return null
  }

  if (selectedOption.icon) {
    return (
      <div className={className}>
        <i className={twMerge(selectedOption.icon)} />
      </div>
    )
  }

  return null
}
