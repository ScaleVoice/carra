import { FC, PropsWithChildren } from "react"

export const CalendarLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex h-[calc(100vh-81px)]">{children}</div>
}
