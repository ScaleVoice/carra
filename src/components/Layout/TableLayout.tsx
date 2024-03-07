import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface Props {
  children: ReactNode
  isSidebarOpened: boolean
}

export function TableLayout({ children, isSidebarOpened }: Props) {
  return (
    <div
      className={twMerge(
        "grid transition-all",
        isSidebarOpened ? "grid-cols-sidebarOpened" : "grid-cols-sidebarClosed",
      )}
    >
      {children}
    </div>
  )
}
