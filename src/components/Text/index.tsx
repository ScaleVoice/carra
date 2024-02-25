import { VariantProps, cva } from "class-variance-authority"
import { PropsWithChildren } from "react"
import { twMerge } from "tailwind-merge"

type Props = TextVariantsType &
  PropsWithChildren & {
    className?: string
  }

export type TextVariantsType = VariantProps<typeof textVariants>

const textVariants = cva("text-gray", {
  variants: {
    size: {
      xs: "text-[12px] leading-[18px]",
      sm: "text-[14px] leading-5",
      md: "text-[16px] leading-6",
      lg: "text-[18px] leading-7",
      xl: "text-[20px] leading-8",
      "2xl": "text-[32px] leading-9",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semiBold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "medium",
  },
})

export const Text = ({ size = "md", weight = "medium", className, children }: Props) => {
  const classNameVariants = textVariants({ size, weight })

  return <span className={twMerge(classNameVariants, className)}>{children}</span>
}
