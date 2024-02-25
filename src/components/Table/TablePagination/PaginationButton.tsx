import { Button, ButtonProps } from "@/components/Buttons/Button"
import { Icon, IconName } from "@/components/Icons"
import { Text } from "@/components/Text"
import { useTranslation } from "react-i18next"

type Props = ButtonProps & {
  icon: Extract<IconName, "ArrowLeft" | "ArrowRight">
}

const PaginationButton = ({ icon, ref, ...props }: Props) => {
  const { t } = useTranslation()
  return (
    <Button {...props} variant="outlined" size="small" className="gap-1">
      {icon == "ArrowLeft" && <Icon name={icon} size="1rem" />}

      <Text size="sm" weight="bold">
        {icon === "ArrowLeft" ? t("previous") : t("next")}
      </Text>
      {icon == "ArrowRight" && <Icon name={icon} size="1rem" />}
    </Button>
  )
}

export default PaginationButton
