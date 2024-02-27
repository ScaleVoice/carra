import { useTranslation } from "react-i18next"
import { Text } from "../Text"

interface Props {
  text?: string
}

export function NoResults({ text }: Props) {
  const { t } = useTranslation()

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col items-center gap-2 py-10">
        <Text size="xl">{text ?? t("table_no_results_heading")}</Text>

        <Text>{t("table_no_results_hint")}</Text>
      </div>
    </div>
  )
}
