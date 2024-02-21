import { SerializedStyles } from '@emotion/react'
import { Flex } from 'components/Flex'
import { Spacer } from 'components/spacer/Spacer'
import { TextBodyMedium } from 'components/text/Text'
import { AnimatePresence, motion } from 'framer-motion'
import { Dispatch, SetStateAction, useMemo } from 'react'
import { SSelectedBorder, STabItem, STabs } from './Tabs.styled'
import { TabConfig } from './Tabs.utils'

interface Props<K extends string> {
  selectedTabId: K
  setSelectedTab: Dispatch<SetStateAction<K>>
  tabs: TabConfig<K>[]
  tabStyles?: SerializedStyles
}

export function Tabs<K extends string>({
  selectedTabId,
  setSelectedTab,
  tabs,
  tabStyles
}: Props<K>) {
  const selectedTab = useMemo(
    () => tabs.find(tab => tab.id === selectedTabId),
    [selectedTabId, tabs]
  )

  return (
    <Flex variant="column">
      <STabs tabsCount={tabs.length}>
        {tabs.map(tab => (
          <STabItem
            key={`tab_${tab.id}`}
            onClick={() => setSelectedTab(tab.id)}
            isSelected={selectedTab?.id === tab.id}
          >
            <TextBodyMedium size="x-large">{tab.label}</TextBodyMedium>
            {selectedTab?.id === tab.id && (
              <SSelectedBorder layoutId="underline" />
            )}
          </STabItem>
        ))}
      </STabs>

      <Spacer size={6} axis="vertical" />

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTab ? selectedTab.label : 'empty'}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          css={tabStyles}
        >
          {selectedTab && selectedTab.Content}
        </motion.div>
      </AnimatePresence>
    </Flex>
  )
}
