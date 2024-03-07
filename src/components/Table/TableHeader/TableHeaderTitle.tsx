import { Text } from "@/components/Text"
import { Trans, useTranslation } from "react-i18next"

interface Props {
  title: string
  itemsCount: number
}

const TableHeaderTitle = ({ itemsCount, title }: Props) => {
  const { t } = useTranslation()

  return (
    <div className="flex w-full items-center justify-between">
      <Text size="xl" weight="semiBold" className="text-black">
        {title}
      </Text>

      <div className="flex items-center gap-2 text-xs tracking-[0.25rem] text-gray-300">
        <Trans t={t} i18nKey="table_results" tOptions={{ results: itemsCount }}>
          <Text className="text-gray-800" size="sm" />
        </Trans>
      </div>
    </div>
  )
}

export default TableHeaderTitle
