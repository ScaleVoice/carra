import { css } from '@emotion/react'
import { TextBody, TextBodyBold } from 'components/text/Text'
import { size } from 'core/styles/spacing'
import { color, shadow } from 'core/styles/variables'
import { Trans, useTranslation } from 'next-i18next'
import { useMemo } from 'react'
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
  YAxis
} from 'recharts'
import { useCarDetailFormCtx } from 'sections/carDetail/CarDetail.utils'
import { formatCurrency } from 'utils/currency'
import {
  getCarPriceAreaCoordinates,
  priceTickFormatter
} from './PricingTab.utils'

export function PricingHistogram() {
  const form = useCarDetailFormCtx()

  const { webPosition, webPositionPriceList, expectedPrice } = form.getValues()

  const { start, end } = getCarPriceAreaCoordinates(webPositionPriceList ?? [])

  const graphData = useMemo(
    () => webPositionPriceList?.map(price => ({ price })),
    [webPositionPriceList]
  )

  const priceDomain = expectedPrice
    ? [0, expectedPrice + expectedPrice * 0.1]
    : undefined

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={graphData} barCategoryGap={0}>
        <Bar dataKey="price" fill={color('night-l-700')} />
        <XAxis
          tickFormatter={() => ''}
          tickLine={false}
          axisLine={false}
          tickCount={webPositionPriceList?.length}
        />

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

        <CartesianGrid vertical={false} stroke={color('night-l-200', 0.08)} />

        <ReferenceArea
          x1={start}
          x2={end}
          y1={0}
          y2={expectedPrice}
          fill={color('night-l-650')}
          stroke={color('night-l-650')}
        />

        {webPosition && (
          <ReferenceArea
            x1={start}
            x2={end}
            y1={0}
            y2={2}
            stroke={color('night-l-100')}
            strokeWidth={2}
            label={
              <ReferenceBottomAreaLabel
                fill={color('night-l-100')}
                value={`WP ${webPosition?.toFixed(2)}`}
              />
            }
          />
        )}

        {expectedPrice && (
          <ReferenceLine
            y={expectedPrice}
            stroke={color('night-l-100')}
            strokeWidth={2}
          >
            <Label
              position="top"
              value={formatCurrency(expectedPrice)}
              stroke={color('night-l-100')}
              style={{ fontSize: 14 }}
            />
          </ReferenceLine>
        )}

        <Tooltip
          cursor={{
            fill: color('night-l-200', 0.5)
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
      <div
        css={css`
          background: #fff;
          box-shadow: ${shadow(3)};
          border-radius: 6px;
          padding: ${size(2)} ${size(4)};
        `}
      >
        <Trans
          t={t}
          i18nKey={'histogram_tooltip_price'}
          tOptions={{
            n: payload[0].value ? formatCurrency(payload[0].value) : undefined
          }}
        >
          <TextBodyBold size="small" color="night-l-100" />
          <TextBody size="small" />
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

  const x = isLabelWider
    ? viewBox.x - (LABEL_WIDTH - viewBox.width) / 2
    : viewBox.x + (viewBox.width - LABEL_WIDTH) / 2
  const y = viewBox.y + 8

  return (
    <g>
      <rect x={x} y={y} width={70} height={22} fill={fill} rx="4" />
      <text x={x + 9} y={y + 16} font-size="14" fill="white">
        {value}
      </text>
    </g>
  )
}
