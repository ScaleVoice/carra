import { Text } from "@/components/Text"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { AttributeRow } from "./AttributeRow"
import { TickingItem } from "@/api/useSearch"

type Props = {
  seller?: TickingItem["seller"] | null
}

export const Customer: FC<Props> = ({ seller }) => {
  const { t } = useTranslation("tickingList")
  return (
    <>
      <Text size="xl" className="mt-4 self-baseline text-gray-800">
        {t("tabs_customer_title")}
      </Text>
      <div className="flex w-full flex-wrap justify-between gap-2 gap-y-8">
        <AttributeRow
          name="phone"
          value={formatPhoneNumber(seller?.contact?.phonePrefix, seller?.contact?.phoneNumber)}
          label={t("customer_phone_number")}
        />
        <AttributeRow name="type" value={seller?.type} label={t("customer_type")} />
        <AttributeRow name="seller" value={seller?.name} label={t("customer_name")} />
      </div>
    </>
  )
}

function formatPhoneNumber(prefix?: string, number?: string) {
  if (!prefix && !number) return ""
  return `${prefix} ${number}`
}
