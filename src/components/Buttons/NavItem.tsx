import { ROUTES } from "@/conf"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"
import { Category } from "../Dashboard/DashboardProvider"
import { Icon } from "../Icons"

interface NavItemProps {
  category: Category
  onClick?: () => void
}

const activeStyle = "bg-primary-800 text-primary"

export const NavItem: FC<NavItemProps> = ({ category, onClick }) => {
  const { t } = useTranslation("dashboard")
  const pathname = usePathname()

  const isActive = category.route === ROUTES.root ? pathname === category.route : pathname.includes(category.route)

  return (
    <Link
      href={category.route}
      className={twMerge(
        "group flex items-center gap-2 rounded-md p-3 font-semibold text-gray hover:bg-primary-900 hover:text-primary-300",
        isActive && activeStyle,
      )}
      onClick={onClick}
    >
      <Icon
        name={category.icon}
        className={twMerge("group-hover:text-primary-300", isActive ? "text-primary" : "text-gray")}
      />
      <span className="flex-1">{t(category.label)}</span>
    </Link>
  )
}
