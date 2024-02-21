import { Flex } from 'components/Flex'
import { Spacer } from 'components/spacer/Spacer'
import { TextHeader } from 'components/text/Text'
import { useTranslation } from 'next-i18next'
import { CallScriptItem, useCallScriptSteps } from './CallscriptTab.utils'

export function CallscriptTab() {
  const { t } = useTranslation()

  const callscriptSteps = useCallScriptSteps()

  return (
    <Flex variant="column">
      <TextHeader variant="h6" as="h6">
        {t('seller_detail_tabs_callscript')}
      </TextHeader>

      <Spacer size={9} axis="vertical" />

      <Flex variant="column" gap={8}>
        {callscriptSteps.map(step => (
          <CallScriptItem {...step} key={step.stepNumber} />
        ))}
      </Flex>
    </Flex>
  )
}
