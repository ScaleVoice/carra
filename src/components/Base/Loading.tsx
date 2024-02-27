import { FC } from "react"
import { twMerge } from "tailwind-merge"

type LoadingSpinnerProps = {
  className?: string
  variant?: "light" | "dark"
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({ className, variant = "dark" }) => {
  return (
    <div
      className={twMerge(
        variant === "dark" ? "border-gray" : "border-gray-100",
        "h-5 w-5 animate-spin rounded-full border-2 border-solid border-t-transparent",
        className,
      )}
    />
  )
}
