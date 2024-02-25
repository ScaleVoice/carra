import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface Props {
  children: ReactNode
  openedFilters: boolean
}

export function TableLayout({ children, openedFilters }: Props) {
  return <div className={twMerge("grid", openedFilters ? "" : "")}>{children}</div>
}
