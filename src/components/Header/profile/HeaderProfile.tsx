import { AvatarAuth } from "@/components/Avatar/AvatarAuth"
import { Button } from "@/components/Buttons/Button"
import { Icon } from "@/components/Icons"
import { Popover } from "@/components/Popover/Popover"
import { useAuth } from "@clerk/nextjs"
import { useTranslation } from "react-i18next"

type Props = {
  className: string
}

export function HeaderProfile({ className }: Props) {
  const { t } = useTranslation()
  const auth = useAuth()

  async function handleLogout() {
    await auth.signOut()
  }

  return (
    <div className={className}>
      <Popover trigger={<AvatarAuth />}>
        <div className="relative right-4 top-2 flex flex-col rounded-md border border-gray-50 bg-white p-3 text-gray-400">
          <Button
            variant="custom"
            size="normal"
            onClick={handleLogout}
            className="flex items-center gap-10 hover:text-primary-400"
          >
            {t("signout")}
            <Icon name="IconLogout" />
          </Button>
        </div>
      </Popover>
    </div>
  )
}
