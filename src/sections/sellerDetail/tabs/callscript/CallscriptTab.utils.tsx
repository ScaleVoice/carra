import { css } from '@emotion/react'
import { Flex } from 'components/Flex'
import { TextBody, TextBodyMedium } from 'components/text/Text'
import { size } from 'core/styles/spacing'
import { useTranslation } from 'next-i18next'
import { SStepNumber } from './CallscriptTab.styled'

interface ScriptStep {
  stepNumber: number
  title: string
  text: string
}

export const useCallScriptSteps = (): ScriptStep[] => {
  const { t } = useTranslation()

  return [
    {
      stepNumber: 1,
      title: t('seller_detail_callscript_step_1_title'),
      text: t('seller_detail_callscript_step_1_text')
    },
    {
      stepNumber: 2,
      title: t('seller_detail_callscript_step_2_title'),
      text: t('seller_detail_callscript_step_2_text')
    },
    {
      stepNumber: 3,
      title: t('seller_detail_callscript_step_3_title'),
      text: t('seller_detail_callscript_step_3_text')
    },
    {
      stepNumber: 4,
      title: t('seller_detail_callscript_step_4_title'),
      text: t('seller_detail_callscript_step_4_text')
    },
    {
      stepNumber: 5,
      title: t('seller_detail_callscript_step_5_title'),
      text: t('seller_detail_callscript_step_5_text')
    }
  ]
}

export function CallScriptItem({ stepNumber, title, text }: ScriptStep) {
  return (
    <Flex variant="row" gap={4}>
      <SStepNumber>{stepNumber}</SStepNumber>

      <Flex
        variant="column"
        gap={2}
        css={css`
          padding-top: ${size(1)};
        `}
      >
        <TextBodyMedium color="black">{title}</TextBodyMedium>

        <TextBody>{text}</TextBody>
      </Flex>
    </Flex>
  )
}
