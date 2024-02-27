import { cva } from "class-variance-authority"
import { Fragment } from "react"
import { twMerge } from "tailwind-merge"

type TabOption = {
  label: string
  value: string | number | null
}

export type TabProps<O = void> = O extends void ? DefaultTabProps : GenericTabProps<O extends TabOption ? O : never>

type GenericTabProps<O extends TabOption> = {
  value: O["value"]
  options: O[]
  renderOption?: (option: O, isSelected: boolean, isFirst: boolean, isLast: boolean) => JSX.Element
  onClick: (value: O["value"]) => void
} & Omit<DefaultTabProps, "options" | "value" | "onClick" | "renderOption">

type DefaultTabProps = {
  value: TabOption["value"]
  options: TabOption[]
  renderOption?: (option: TabOption, isSelected: boolean, isFirst: boolean, isLast: boolean) => JSX.Element
  onClick: (value: TabOption["value"]) => void
  containerClassName?: string
  className?: string
  orientation?: "horizontal" | "vertical"
  variant?: "primary" | "secondary"
}

const switchVariants = cva("rounded-md", {
  variants: {
    orientation: {
      vertical: ["flex", "flex-col"],
      horizontal: ["flex"],
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
})

export function Tabs<O extends TabOption>({
  options,
  value,
  className,
  containerClassName,
  onClick,
  orientation = "horizontal",
  variant = "primary",
  renderOption,
}: TabProps<O>) {
  return (
    <div className={twMerge(switchVariants({ orientation }), containerClassName)}>
      {options.map((option, i) => {
        const isFirst = i === 0
        const isLast = i === options.length - 1

        return (
          <Fragment key={option.value}>
            {renderOption ? (
              <>{renderOption(option, value === option.value, isFirst, isLast)}</>
            ) : (
              <DefaultButton<O>
                orientation={orientation}
                variant={variant}
                isFirst={isFirst}
                isLast={isLast}
                isSelected={value === option.value}
                option={option}
                onClick={onClick}
                className={className}
              />
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

type DefaultButtonProps<O extends TabOption> = {
  isFirst: boolean
  isLast: boolean
  isSelected: boolean
  className?: string
  orientation: TabProps<O>["orientation"]
  option: TabProps<O>["options"][0]
  onClick: TabProps<O>["onClick"]
  variant: TabProps<O>["variant"]
}

function DefaultButton<O extends TabOption>({
  isFirst,
  isLast,
  isSelected,
  option,
  className,
  orientation,
  variant,
  onClick,
}: DefaultButtonProps<O>) {
  const switchVariants = cva("p-3 mx-2 rounded-md outline-none", {
    variants: {
      variant: {
        primary: [isSelected ? "bg-white text-gray-700 shadow-sm font-semibold" : "bg-transparent text-gray-400"],
        secondary: [isSelected ? "bg-secondary text-white" : "bg-gray-50"],
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  })

  return (
    <button
      type="button"
      className={twMerge(
        switchVariants({ variant }),
        isFirst ? (orientation === "horizontal" ? "ml-0" : "mt-0") : "",
        isLast ? (orientation === "horizontal" ? "mr-0" : "mb-0") : "",
        className,
      )}
      onClick={(_) => onClick(option.value)}
    >
      {option.label}
    </button>
  )
}
