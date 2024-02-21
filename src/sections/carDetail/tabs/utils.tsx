import { TabConfig } from 'components/tabs/Tabs.utils'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { CarTab } from './car/CarTab'
import { CustomerTab } from './customer/CustomerTab'
import { PricingTab } from './pricing/PricingTab'

type CarDetailTabKey = 'car' | 'customer' | 'pricing' | 'note'

export function useCarDetailTabs(): TabConfig<CarDetailTabKey>[] {
  const { t } = useTranslation()

  return useMemo(
    () => [
      {
        id: 'car',
        label: t('car_detail_tabs_car'),
        Content: <CarTab />
      },
      {
        id: 'customer',
        label: t('car_detail_tabs_customer'),
        Content: <CustomerTab />
      },
      {
        id: 'pricing',
        label: t('car_detail_tabs_pricing'),
        Content: <PricingTab />
      }
    ],
    [t]
  )
}
