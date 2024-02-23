import { getAuth, signOut } from "firebase/auth"
import { useTranslation } from "react-i18next"
import { Button } from "rtu-components"
import { Logo } from "../Base/Logo"
import { NavItem } from "../Buttons/NavItem"
import { Icon } from "../Icons"
import { useDashboardContext } from "./DashboardProvider"

export const DashboardNavigation = () => {
  const { categories } = useDashboardContext()
  const { t } = useTranslation("dashboard")

  return (
    <div className="fixed left-0 top-0 hidden h-screen w-64 flex-col justify-between border-r border-gray-800 bg-gray-50 p-6 md:flex">
      <div>
        <Logo variant="primary" width={146} height={40} className="mb-10" />

        <div className="mt-6 flex gap-1 flex-col">
          {categories.map((category) => (
            <NavItem key={category.id} category={category} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Button
          intent="icon"
          size="custom"
          className="mt-8 self-start p-3 text-gray"
          onClick={() => signOut(getAuth())}
        >
          <Icon name="LogOut01" className="text-gray" />
          {t("logout")}
        </Button>
      </div>
    </div>
  )
}
