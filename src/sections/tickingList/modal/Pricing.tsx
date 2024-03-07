import { Text } from "@/components/Text"
import { formatCurrency } from "@/utils/currency"
import { getValue } from "@/utils/value"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { TickingItem } from "../table/TickingListTable.utils"
import { AttributeRow } from "./AttributeRow"
import { AttributeRowAlternative } from "./AttributeRowAlternative"
import { PricingHistogram } from "./PricingHistogram"

type Props = {
  item?: TickingItem | null
}

export const Pricing: FC<Props> = ({ item }) => {
  const { t } = useTranslation("tickingList")

  return (
    <>
      <Text size="xl" className="self-baseline text-gray-800">
        {t("tabs_pricing_title")}
      </Text>

      <div className="flex w-full flex-wrap justify-between gap-2 gap-y-8">
        <AttributeRow
          name="expectedPrice"
          value={formatCurrency(item?.expectedPrice)}
          label={t("pricing_expectedPrice")}
        />
        <AttributeRow
          name="recommendedBuyingPrice"
          value={formatCurrency(item?.recommendedBuyingPrice)}
          label={t("pricing_recommendedBuyingPrice")}
        />

        <AttributeRow
          name="maxBuyingPrice"
          value={formatCurrency(item?.maxBuyingPrice)}
          label={t("pricing_maxBuyingPrice")}
          containerClassName="w-[32%]"
        />
        <AttributeRow
          name="retailPrice"
          value={formatCurrency(item?.retailPrice)}
          label={t("pricing_retailPrice")}
          containerClassName="w-[32%]"
        />
        <AttributeRow
          name="tradePrice"
          value={formatCurrency(item?.tradePrice)}
          label={t("pricing_tradePrice")}
          containerClassName="w-[32%]"
        />
      </div>

      <Text size="xl" className="mt-4 self-baseline text-gray-800">
        {t("tabs_pricing_kpi")}
      </Text>

      <div className="flex w-full justify-between gap-2">
        <AttributeRow name="grade" value={item?.carGrade} label={t("pricing_grade")} />
        <div className="flex w-[49%] flex-col gap-3">
          <AttributeRowAlternative label={t("pricing_st")} value={getValue()} />
          <AttributeRowAlternative label={t("pricing_l_plan")} value={getValue()} />
          <AttributeRowAlternative label={t("pricing_wp")} value={getValue(item?.webPosition)} />
          <AttributeRowAlternative label={t("pricing_leasing")} value={getValue()} className="border-none" />
        </div>
      </div>

      {item && (
        <>
          <Text size="xl" className="mt-4 self-baseline text-gray-800">
            {t("tabs_pricing_comparison")}
          </Text>
          <PricingHistogram item={item} />
        </>
      )}
    </>
  )
}
