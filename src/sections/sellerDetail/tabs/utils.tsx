import { TabConfig } from 'components/tabs/Tabs.utils'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { CallscriptTab } from './callscript/CallscriptTab'
import { HistoryTab } from './history/HistoryTab'
import { SellerTab } from './seller/SellerTab'

export type SellerDetailTabKey = 'seller' | 'history' | 'callscript'

export function useSellerDetailTabs(): TabConfig<SellerDetailTabKey>[] {
  const { t } = useTranslation()

  return useMemo(
    () => [
      {
        id: 'seller',
        label: t('seller_detail_tabs_seller'),
        Content: <SellerTab />
      },
      {
        id: 'history',
        label: t('seller_detail_tabs_history'),
        Content: <HistoryTab />
      },
      {
        id: 'callscript',
        label: t('seller_detail_tabs_callscript'),
        Content: <CallscriptTab />
      }
    ],
    [t]
  )
}
