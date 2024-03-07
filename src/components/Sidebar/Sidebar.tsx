import { FC, PropsWithChildren } from "react"
import { useTranslation } from "react-i18next"
import { ButtonRound } from "../Buttons/ButtonRound"
import { Icon } from "../Icons"
import { Text } from "../Text"

type Props = PropsWithChildren & {
  open?: boolean
  toggleSidebar: () => void
}

export const Sidebar: FC<Props> = ({ open, children, toggleSidebar }) => {
  const { t } = useTranslation()

  return (
    <div className="flex h-[calc(100vh-81px)] flex-col border-r border-gray-50 px-5 py-6">
      <div className="flex items-center justify-between">
        {open && (
          <Text size="xl" weight="semiBold" className="text-black">
            {t("filters")}
          </Text>
        )}
        <ButtonRound className="h-10 w-10 self-end p-2" onClick={toggleSidebar}>
          <Icon name="ChevronRightDouble" className={open ? "rotate-180" : "rotate-0"} />
        </ButtonRound>
      </div>
      {open && children}
    </div>
  )
}
