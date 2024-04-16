import { ComponentVariantState, ComponentVariantType, getComponentStateVariants } from "@/css/variants/stateVariants"
import { VariantProps, cva } from "class-variance-authority"
import { ChangeEvent, HTMLProps, ReactNode, forwardRef } from "react"
import { twMerge } from "tailwind-merge"
import { CheckboxSvg } from "./CheckboxSvg"

export type CheckboxProps = Omit<HTMLProps<HTMLInputElement>, "size" | "error" | "onChange" | "ref"> &
  CheckboxVariantProps &
  CheckboxColorVariantProps &
  CheckboxIconVariantProps & {
    name: string
    checked?: boolean
    error?: boolean
    containerClassName?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    renderLabel?: (className?: string) => JSX.Element
    renderCheckedIcon?: (defaultClassName: string) => ReactNode
  }
type CheckboxVariantProps = VariantProps<typeof checkboxSizeVariants>
type CheckboxIconVariantProps = VariantProps<typeof checkboxIconSizeVariants>
type CheckboxColorVariantProps = VariantProps<typeof checkboxColorVariants>

const checkboxColorVariants = cva("", {
  variants: {
    color: {
      primary: [
        "[&>input]:text-primary",
        "[&>input]:border",
        "[&>input]:border-primary",
        "[&>input:focus]:border-primary",
        "[&>input:checked]:border-primary",
        "[&>input:checked]:bg-primary-25",
        "[&>svg]:text-primary",
      ],
      success: [
        "[&>input]:text-success",
        "[&>input]:border",
        "[&>input]:border-success",
        "[&>input:focus]:border-success",
        "[&>input:checked]:border-success",
        "[&>input:checked]:bg-success-25",
        "[&>svg]:text-success"
      ],
      warning: [
        "[&>input]:text-warning",
        "[&>input]:border",
        "[&>input]:border-warning",
        "[&>input:focus]:border-warning",
        "[&>input:checked]:border-warning",
        "[&>input:checked]:bg-warning-25",
        "[&>svg]:text-warning"
      ],
      custom: [""],
    },
  },
  defaultVariants: {
    color: "primary",
  },
})

const checkboxSizeVariants = cva("", {
  variants: {
    size: {
      xl: ["w-[1.25rem]", "h-[1.25rem]"],
      large: ["w-[1.125rem]", "h-[1.125rem]"],
      normal: ["w-[1rem]", "h-[1rem]"],
      small: ["w-[0.875rem]", "h-[0.875rem]"],
      custom: [""],
    },
  },
  defaultVariants: {
    size: "normal",
  },
})

const checkboxIconSizeVariants = cva("", {
  variants: {
    size: {
      xl: ["1rem"],
      large: ["0.875rem"],
      normal: ["0.75rem"],
      small: ["0.625rem"],
      custom: "",
    },
    color: {
      primary: ["text-primary"],
      success: ["text-success"],
      warning: ["text-warning"],
      custom: "",
    },
  },
  defaultVariants: {
    size: "normal",
  },
})

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      renderLabel,
      name,
      containerClassName,
      disabled,
      className,
      checked,
      error,
      size,
      color,
      renderCheckedIcon,
      ...props
    },
    ref,
  ) => {
    const { wrapperStateVariants, inputStateVariants } = getComponentStateVariants(
      ComponentVariantType.CHECKBOX,
      error ? ComponentVariantState.ERROR : ComponentVariantState.DEFAULT,
    )

    return (
      <span
        className={twMerge(
          "user-select-none relative flex shrink-0 cursor-pointer items-center justify-center transition",
          "[&>svg]:pointer-events-none [&>svg]:absolute",
          checkboxSizeVariants({ size }),
          wrapperStateVariants,
          checkboxColorVariants({ color }),
          containerClassName,
        )}
      >
        <input
          ref={ref}
          id={name}
          type="checkbox"
          name={name}
          disabled={disabled}
          checked={checked}
          className={twMerge(
            "z-1 cursor-inherit peer relative appearance-none rounded outline-none transition",
            checkboxSizeVariants({ size }),
            // inputStateVariants,
            disabled ? "cursor-default" : "cursor-pointer",
            className,
          )}
          {...props}
        />
        {renderCheckedIcon ? (
          <>
            {renderCheckedIcon(
              twMerge("relative opacity-0 peer-checked:opacity-100", checkboxIconSizeVariants({ size })),
            )}
          </>
        ) : (
          <CheckboxSvg width={checkboxIconSizeVariants({ size })} height={checkboxIconSizeVariants({ size })} />
        )}
      </span>
    )
  },
)

Checkbox.displayName = "Checkbox"
