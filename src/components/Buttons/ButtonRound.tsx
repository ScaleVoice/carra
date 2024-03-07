import { VariantProps, cva } from "class-variance-authority"
import { FC } from "react"
import { twMerge } from "tailwind-merge"
import { Button, ButtonProps } from "./Button"

export type ButtonRoundProps = Omit<ButtonProps, "size" | "variant"> & ButtonRoundVariantProps
export type ButtonRoundVariantProps = VariantProps<typeof buttonRoundVariants>
export const buttonRoundVariants = cva("rounded-full font-bold", {
  variants: {
    variant: {
      primary: ["text-primary", "bg-primary-25", "hover:bg-primary-50", "active:bg-primary-100"],
      outlined: [
        "text-gray",
        "border",
        "border-gray-50",
        "hover:text-gray-600",
        "active:text-gray-700",
        "hover:border-gray-100",
        "active:border-gray-200",
      ],
      destructive: ["text-primary-900", "bg-error", "hover:bg-error-400", "active:bg-error-600"],
      success: ["text-gray-200", "bg-success", "hover:bg-success-400", "active:bg-success-600"],
    },
    size: {
      large: ["p-4"],
      normal: ["p-[13px]"],
      small: ["p-3"],
      tiny: ["p-2"],
      custom: [""],
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "normal",
  },
})

export const ButtonRound: FC<ButtonRoundProps> = ({ ref, className = "", size, variant, children, ...rest }) => {
  return (
    <Button
      {...rest}
      className={twMerge(buttonRoundVariants({ size, variant }), className)}
      variant="custom"
      size="custom"
    >
      {children}
    </Button>
  )
}
