import { Flex } from 'components/Flex'
import { TextBody, TextHeader } from 'components/text/Text'
import { size } from 'core/styles/spacing'
import { useTranslation } from 'next-i18next'

interface Props {
  text?: string
  hint?: string | false
}

export function NoResults({ text, hint }: Props) {
  const { t } = useTranslation()

  return (
    <div
      css={{
        display: 'grid',
        placeItems: 'center',
        height: `calc(100vh - ${size(70)})`
      }}
    >
      <Flex variant="column" gap={5} align="center">
        <TextHeader variant="h3" as="h3">
          {text ?? t('table_no_results_heading')}
        </TextHeader>

        {hint !== false && (
          <TextBody>{hint ?? t('table_no_results_hint')}</TextBody>
        )}
      </Flex>
    </div>
  )
}
