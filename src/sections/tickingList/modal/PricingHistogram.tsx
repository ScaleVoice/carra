import { Text } from "@/components/Text"
import { formatCurrency } from "@/utils/currency"
import { useMemo } from "react"
import { Trans, useTranslation } from "react-i18next"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts"
import { PRIMARY } from "tailwind.config"
import { TickingItem } from "../table/TickingListTable.utils"
import { getCarPriceAreaCoordinates, hexToRgb, priceTickFormatter } from "./Pricing.utils"

type Props = {
  item: TickingItem
}

export function PricingHistogram({ item }: Props) {
  const { webPosition, webPositionPriceList, expectedPrice } = item

  const { start, end } = getCarPriceAreaCoordinates(webPositionPriceList ?? [])

  const graphData = useMemo(() => webPositionPriceList?.map((price) => ({ price })), [webPositionPriceList])

  const priceDomain = expectedPrice ? [0, expectedPrice + expectedPrice * 0.1] : undefined

  console.log("hex", hexToRgb(PRIMARY["200"], 0.08))

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={graphData} barCategoryGap={0}>
        <Bar dataKey="price" fill={PRIMARY[25]} />
        <XAxis tickFormatter={() => ""} tickLine={false} axisLine={false} tickCount={webPositionPriceList?.length} />

        <YAxis
          domain={priceDomain}
          tickMargin={5}
          dataKey="price"
          tickCount={8}
          tickLine={false}
          style={{ fontSize: 14 }}
          axisLine={false}
          tickFormatter={priceTickFormatter}
        />

        <CartesianGrid vertical={false} stroke={hexToRgb(PRIMARY[300], 0.1)} />

        <ReferenceArea x1={start} x2={end} y1={0} y2={expectedPrice} fill={PRIMARY[500]} />

        {webPosition && (
          <ReferenceArea
            x1={start}
            x2={end}
            y1={0}
            y2={2}
            stroke={PRIMARY[100]}
            strokeWidth={2}
            label={<ReferenceBottomAreaLabel fill={PRIMARY[500]} value={`WP ${webPosition?.toFixed(2)}`} />}
          />
        )}

        {expectedPrice && (
          <ReferenceLine y={expectedPrice} stroke={PRIMARY[500]} strokeWidth={2}>
            <Label
              position="top"
              value={formatCurrency(expectedPrice)}
              stroke={PRIMARY[500]}
              style={{ fontSize: 14 }}
            />
          </ReferenceLine>
        )}

        <Tooltip
          cursor={{
            fill: "transparent"
          }}
          contentStyle={{ border: 0, borderRadius: 6 }}
          content={<TooltipContent />}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

const TooltipContent = (props: TooltipProps<number, string>) => {
  const { t } = useTranslation()
  const { active, payload } = props

  if (active && !!payload) {
    return (
      <div className="rounded-md bg-white px-2 py-4 shadow-md">
        <Trans
          t={t}
          i18nKey={"histogram_tooltip_price"}
          tOptions={{
            n: payload[0].value ? formatCurrency(payload[0].value) : undefined,
          }}
        >
          <Text size="sm" className="font-bold text-primary-100" />
          <Text size="sm" />
        </Trans>
      </div>
    )
  }

  return null
}

// WP Label width
const LABEL_WIDTH = 70

export function ReferenceBottomAreaLabel(props: any) {
  const { fill, viewBox, value } = props
  const isLabelWider = viewBox.width < LABEL_WIDTH

  const x = isLabelWider ? viewBox.x - (LABEL_WIDTH - viewBox.width) / 2 : viewBox.x + (viewBox.width - LABEL_WIDTH) / 2
  const y = viewBox.y + 8

  return (
    <g>
      <rect x={x} y={y} width={70} height={22} fill={fill} rx="4" />
      <text x={x + 9} y={y + 16} fontSize="14" fill="white">
        {value}
      </text>
    </g>
  )
}
