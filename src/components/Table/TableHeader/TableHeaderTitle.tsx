import { Text } from "@/components/Text"
import { useTranslation } from "react-i18next"
import TableHeaderType from "./TableHeaderType"

interface Props {
  title: string
  itemsCount: number
  type?: TableHeaderType
}

const TableHeaderTitle = ({ itemsCount, title, type = "default" }: Props) => {
  const { t } = useTranslation()

  switch (type) {
    case "search":
      return (
        <div className="flex items-center gap-x-2">
          <Text text={t("searchResults")} size="lg" weight="semiBold" />
          {/* <Label label={itemsCount.toString()} /> */}
        </div>
      )
    case "selected":
      return (
        <div className="flex items-center gap-x-2">
          <Text text={`${title} ${t("selected")}`} size="lg" weight="semiBold" />
        </div>
      )
    default:
      return (
        <div className="flex items-center gap-x-2">
          <Text text={title} size="lg" weight="semiBold" />
          {/* <Label label={itemsCount.toString()} /> */}
        </div>
      )
  }
}

export default TableHeaderTitle
