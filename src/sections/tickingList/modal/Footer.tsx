import { Button } from "@/components/Buttons/Button"
import { Icon } from "@/components/Icons"
import { useTranslation } from "react-i18next"

export const Footer = () => {
  const { t } = useTranslation("tickingList")

  return (
    <div className="flex w-full flex-grow flex-col justify-end">
      <div className="flex w-full justify-between">
        <Button variant="outlined" className="rounded-full px-16">
          <Icon name="PhoneX" />
          {t("modal_call_no")}
        </Button>
        <Button variant="outlined" className="rounded-full px-16">
          <Icon name="PhoneOutgoing01" />
          {t("modal_call_yes")}
        </Button>
        <Button variant="outlined" className="rounded-full px-16">
          <Icon name="Star01" />
          {t("modal_hot_deal")}
        </Button>
      </div>
    </div>
  )
}
