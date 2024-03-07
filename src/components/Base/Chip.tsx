import { FC, MouseEvent, PropsWithChildren } from "react"
import { twMerge } from "tailwind-merge"

interface ChipProps extends PropsWithChildren {
  onRemove: () => void
  className?: string
}

export const Chip: FC<ChipProps> = ({ children, onRemove, className = "" }) => {
  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onRemove()
  }

  return (
    <button
      className={twMerge(
        "mx-1 my-1 flex items-center justify-center rounded-lg bg-primary-25 px-2 py-1 text-primary",
        className,
      )}
      onClick={handleRemove}
    >
      {children}
    </button>
  )
}
