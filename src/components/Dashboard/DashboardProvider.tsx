import { ParseKeys } from "i18next"
import { FC, PropsWithChildren, createContext, useContext } from "react"
import { IconName } from "../Icons"

export interface Category {
  id: string
  route: string
  label: ParseKeys<"dashboard">
  icon: IconName
}

interface DashBoardContextValue {
  categories: Category[]
}

interface Props extends PropsWithChildren {
  value: DashBoardContextValue
}

const DashboardContext = createContext<DashBoardContextValue | null>(null)

export const useDashboardContext = () => {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error("useDashboardContext must be used within a DashboardProvider")
  }
  return context
}

const DashboardProvider: FC<Props> = ({ value, children }) => {
  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}

export default DashboardProvider
