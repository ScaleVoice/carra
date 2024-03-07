import { Chip } from "@/components/Base/Chip"
import { Icon } from "@/components/Icons"
import { ComponentVariantState, ComponentVariantType, getComponentStateVariants } from "@/css/variants/stateVariants"
import { Combobox } from "@headlessui/react"
import { cva } from "class-variance-authority"
import { ForwardedRef, HTMLProps, ReactElement, ReactNode, Ref, forwardRef, useRef } from "react"
import { twMerge } from "tailwind-merge"
import { BaseSelectOptions } from "./BaseSelectOptions"
import { StateButton } from "./StateButton"
import { Option } from "./types"
import { SelectVariants, selectSideItemVariants, selectSizeVariants } from "./variantClassNames"

export type MultiSelectProps<O extends Option> = Omit<
  HTMLProps<HTMLInputElement>,
  "value" | "onChange" | "ref" | "size"
> &
  SelectVariants & {
    isLoading?: boolean
    disabled?: boolean
    disableClear?: boolean
    options?: O[]
    selectedOptions?: O[]
    value: string[]
    name: string
    inputClassName?: string
    containerClassName?: string
    optionsClassName?: string
    placeholder?: string
    error?: boolean
    onChange: (value: string[]) => void
    setQuery?: (query: string) => void
    clear: () => void
    transitionDuration?: number
    LoadingIcon?: ReactNode
    ClearIcon?: ReactNode
    DefaultIcon?: ReactNode
    renderOption?: (option: O) => ReactNode
    handleRemove: (value: O["value"]) => void
    renderSelectedOptions?: <O extends Option>(
      selectedOptions: O[],
      handleRemove: (value: O["value"]) => void,
    ) => ReactNode
  }

const selectedSelectSizeVariants = cva("", {
  variants: {
    size: {
      large: ["py-1"],
      normal: ["py-[0.125rem]"],
      small: ["py-0"],
      custom: [""],
    },
  },
  defaultVariants: {
    size: "normal",
  },
})

function Select<O extends Option>(
  {
    isLoading,
    disabled,
    options,
    selectedOptions,
    disableClear,
    value = [],
    name,
    placeholder,
    inputClassName,
    containerClassName,
    optionsClassName,
    error,
    onChange,
    setQuery,
    clear,
    transitionDuration = 150,
    LoadingIcon,
    ClearIcon,
    DefaultIcon,
    renderOption,
    renderSelectedOptions,
    handleRemove,
    size,
  }: MultiSelectProps<O>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const containerRef = useRef(null)

  const { wrapperStateVariants, inputStateVariants } = getComponentStateVariants(
    ComponentVariantType.SELECT,
    error ? ComponentVariantState.ERROR : ComponentVariantState.DEFAULT,
  )
  const sizeVariants = selectSizeVariants({ size })
  const selectedSizeVariants = selectedSelectSizeVariants({ size })
  const sideItemVariantsLeft = selectSideItemVariants({
    size,
    orientation: "left",
  })
  const sideItemVariantsRight = selectSideItemVariants({
    size,
    orientation: "right",
  })

  function onClick() {
    if (!value || isLoading || disableClear) {
      return
    }
    setTimeout(() => {
      clear()
    }, transitionDuration)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (!value || isLoading || disableClear) {
      return false
    }
    if (e.key === "Enter" || e.key === "Space") {
      setTimeout(() => {
        clear()
      }, transitionDuration)
    }

    return true
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery?.(e.target.value)
  }

  return (
    <Combobox value={value} onChange={onChange} disabled={disabled} ref={containerRef} multiple>
      {({ open }) => {
        const showSelectedOptions = !open && selectedOptions?.length
        return (
          <div>
            <Combobox.Button
              as="div"
              className={twMerge(
                "flex w-full items-center",
                sizeVariants,
                showSelectedOptions && selectedSizeVariants,
                wrapperStateVariants,
                open ? "rounded-b-none" : "rounded-b-lg",
                disabled && "pointer-events-none opacity-40",
                containerClassName,
              )}
            >
              {showSelectedOptions ? (
                <div className={twMerge("flex w-full flex-wrap", inputClassName)}>
                  {renderSelectedOptions ? (
                    renderSelectedOptions(selectedOptions, handleRemove)
                  ) : (
                    <RenderChipOptions selectedOptions={selectedOptions} handleRemove={handleRemove} />
                  )}
                </div>
              ) : (
                <Combobox.Input
                  name={name}
                  ref={ref}
                  onChange={handleInputChange}
                  className={twMerge("peer w-full flex-grow appearance-none outline-none", inputStateVariants, inputClassName)}
                  placeholder={placeholder}
                />
              )}

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
              open={open}
              options={options}
              className={sizeVariants}
              leftClassName={sideItemVariantsLeft}
              optionsClassName={optionsClassName}
              selectedOptions={selectedOptions}
              transitionDuration={transitionDuration}
              renderOption={renderOption}
              onTransitionEnd={() => setQuery?.("")}
            />
          </div>
        )
      }}
    </Combobox>
  )
}

interface RenderChipOptionsProps<O extends Option> {
  selectedOptions: O[]
  handleRemove: (value: O["value"]) => void
}

function RenderChipOptions<O extends Option>({ selectedOptions, handleRemove }: RenderChipOptionsProps<O>) {
  return (
    <>
      {selectedOptions.map((option) => {
        return (
          <Chip key={option.value} onRemove={() => handleRemove(option.value)}>
            {option.label}
            <Icon name="IconCross" className="ml-2" size="1rem" />
          </Chip>
        )
      })}
    </>
  )
}

export const MultiSelect = forwardRef(Select) as <O extends Option>(
  p: MultiSelectProps<O> & { ref?: Ref<HTMLSelectElement> },
) => ReactElement
