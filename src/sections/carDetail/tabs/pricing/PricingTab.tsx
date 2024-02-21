import { css } from '@emotion/react'
import { Flex } from 'components/Flex'
import { DetailItem } from 'components/detail/DetailItem'
import { defaultFormatter } from 'components/inputNumber/InputNumber.utils'
import { InputNumberControlled } from 'components/inputNumber/InputNumberControlled'
import { InputNumberNullableControlled } from 'components/inputNumber/InputNumberNullableControlled'
import { Placeholder } from 'components/placeholder/Placeholder'
import { Select } from 'components/select/Select'
import { Spacer } from 'components/spacer/Spacer'
import { TextHeader } from 'components/text/Text'
import { size } from 'core/styles/spacing'
import { useTranslation } from 'next-i18next'
import { useContext } from 'react'
import { TickingItem } from 'sections/tickingList/table/TickingListTable.utils'
import { nameOf } from 'utils/types'
import { CarDetailStateCtx, useCarDetailFormCtx } from '../../CarDetail.utils'
import { PricingHistogram } from './PricingHistogram'
import { SPricingTabGrid } from './PricingTab.styled'
import { carGradeOptions, formatPricingNumber } from './PricingTab.utils'

const CURRENCY = 'R'

export function PricingTab() {
  const { t } = useTranslation()
  const form = useCarDetailFormCtx()
  const { readOnly } = useContext(CarDetailStateCtx)

  const {
    retailStockTurnover,
    retailStockTurnoverLevel,
    wholesaleStockTurnover,
    wholesaleStockTurnoverLevel,
    webPosition,
    webPositionLevel,
    marketStockTurnover,
    marketStockTurnoverLevel,
    rank,
    ads
  } = form.getValues()

  return (
    <Flex
      variant="column"
      css={css`
        padding-right: ${size(3)};
      `}
    >
      <TextHeader variant="h6" as="h6">
        {t('car_detail_tabs_pricing')}
      </TextHeader>

      <Spacer size={4} axis="vertical" />

      <SPricingTabGrid>
        <Flex variant="column" gap={4}>
          <InputNumberControlled
            min={0}
            label={t('car_detail_price_expected_price')}
            name={nameOf<TickingItem>('expectedPrice')}
            css={{
              flex: 1
            }}
            currency={CURRENCY}
            currencyPosition="right"
            inputDisabled
            formatter={defaultFormatter}
          />

          <InputNumberNullableControlled
            min={0}
            label={t('car_detail_price_recommended_buying_price')}
            name={nameOf<TickingItem>('recommendedBuyingPrice')}
            css={{
              flex: 1
            }}
            currency={CURRENCY}
            currencyPosition="right"
            inputDisabled
            formatter={defaultFormatter}
          />

          <InputNumberNullableControlled
            min={0}
            label={t('car_detail_price_new_car_retail_price')}
            name={nameOf<TickingItem>('retailPrice')}
            css={{
              flex: 1
            }}
            currency={CURRENCY}
            currencyPosition="right"
            inputDisabled
            formatter={defaultFormatter}
          />

          <InputNumberNullableControlled
            min={0}
            label={t('car_detail_price_predicted_price')}
            name={nameOf<TickingItem>('predictedPrice')}
            css={{
              flex: 1
            }}
            currency={CURRENCY}
            currencyPosition="right"
            inputDisabled
            formatter={defaultFormatter}
          />
        </Flex>

        <Flex variant="column" gap={4}>
          <InputNumberControlled
            min={0}
            label={t('car_detail_price_max_recommended_buying_price')}
            name={nameOf<TickingItem>('maxBuyingPrice')}
            css={{
              flex: 1
            }}
            currency={CURRENCY}
            currencyPosition="right"
            inputDisabled
            formatter={defaultFormatter}
          />

          <Placeholder />

          <InputNumberNullableControlled
            min={0}
            label={t('car_detail_price_new_car_trade_price')}
            name={nameOf<TickingItem>('tradePrice')}
            css={{
              flex: 1
            }}
            currency={CURRENCY}
            currencyPosition="right"
            inputDisabled
            formatter={defaultFormatter}
          />

          <InputNumberNullableControlled
            min={0}
            label={t('car_detail_price_profit')}
            name={nameOf<TickingItem>('profit')}
            css={{
              flex: 1
            }}
            currency={CURRENCY}
            currencyPosition="right"
            inputDisabled
            formatter={defaultFormatter}
          />
        </Flex>
      </SPricingTabGrid>

      <Spacer size={4} axis="vertical" />

      <TextHeader variant="h6" as="h6">
        {t('car_detail_tabs_kpi')}
      </TextHeader>

      <Spacer size={4} axis="vertical" />

      <div
        css={css`
          width: calc(50% - ${size(3)});
        `}
      >
        <Select
          label={t('car_detail_kpi_grade')}
          name={nameOf<TickingItem>('carGrade')}
          options={carGradeOptions}
          disabled={readOnly}
          disabledMode="solid"
        />
      </div>

      <SPricingTabGrid>
        <Flex variant="column">
          <Spacer size={2} axis="vertical" />

          <DetailItem label={t('car_detail_kpi_rank')} value={rank} />

          <DetailItem
            label={t('car_detail_kpi_wst')}
            value={t('percentage', {
              n: formatPricingNumber(wholesaleStockTurnover)
            })}
          />

          <DetailItem
            label={t('car_detail_kpi_mst')}
            value={t('percentage', {
              n: formatPricingNumber(marketStockTurnover)
            })}
          />

          <DetailItem
            label={t('car_detail_kpi_rst')}
            value={t('percentage', {
              n: formatPricingNumber(retailStockTurnover)
            })}
          />

          <DetailItem
            label={t('car_detail_kpi_wp')}
            value={formatPricingNumber(webPosition)}
          />
        </Flex>

        <Flex variant="column">
          <Spacer size={2} axis="vertical" />

          <DetailItem label={t('car_detail_kpi_ads')} value={ads} />

          <DetailItem
            label={t('car_detail_kpi_wst_lvl')}
            value={wholesaleStockTurnoverLevel}
          />

          <DetailItem
            label={t('car_detail_kpi_mst_lvl')}
            value={marketStockTurnoverLevel}
          />

          <DetailItem
            label={t('car_detail_kpi_rst_lvl')}
            value={retailStockTurnoverLevel}
          />

          <DetailItem
            label={t('car_detail_kpi_wp_lvl')}
            value={webPositionLevel}
          />
        </Flex>
      </SPricingTabGrid>

      <Spacer size={6} axis="vertical" />

      <TextHeader variant="h6" as="h6">
        {t('car_detail_kpi_price_comparison')}
      </TextHeader>

      <Spacer size={4} axis="vertical" />

      <PricingHistogram />
    </Flex>
  )
}
