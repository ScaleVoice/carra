import { LINKS } from "@/constants/links"
import Link from "next/link"

import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"
import { Logo } from "../Base/Logo"
import { Icon } from "../Icons"
import { SelectBranch } from "../Inputs/Select/SelectBranch"
import { HeaderLink } from "./HeaderLink"
import { HeaderProfile } from "./profile/HeaderProfile"

export function Header() {
  const { t } = useTranslation()

  return (
    <div className={twMerge("flex items-center justify-between border-b border-gray-50 px-6 py-4")}>
      <div className="flex flex-1 items-center gap-10">
        <Link href={LINKS.home} className="shrink-0">
          <Logo />
        </Link>

        <SelectBranch />
      </div>

      <div className="flex justify-center gap-4">
        <HeaderLink href={LINKS.home} label={t("header_home_link")} Icon={<Icon name="IconCallCustomer" />} />

        <HeaderLink
          href={LINKS.calendar}
          label={t("header_appointments_link")}
          Icon={<Icon name="IconAppointments" />}
        />

        <HeaderLink href={LINKS.history} label={t("header_auctions_link")} Icon={<Icon name="IconTrades" />} />
      </div>

      <HeaderProfile className="flex flex-1 justify-end" />
    </div>
  )
}
