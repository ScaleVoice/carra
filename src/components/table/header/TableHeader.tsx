import { Flex } from 'components/Flex'
import { Spacer } from 'components/spacer/Spacer'
import { TextBody, TextHeader } from 'components/text/Text'
import { Trans, useTranslation } from 'next-i18next'
import { SHeaderText, STableHeaderWrapper } from './TableHeader.styled'

interface Props {
  results: number
  tableName: string
}

export function TableHeader({ results, tableName }: Props) {
  const { t } = useTranslation()

  return (
    <STableHeaderWrapper variant="column">
      <Flex variant="row" justify="between">
        <TextHeader variant="h5">{tableName}</TextHeader>
        <SHeaderText size="small">
          <Trans t={t} i18nKey={'table_results'} tOptions={{ results }}>
            <TextBody color="black" size="small" />
          </Trans>
        </SHeaderText>
      </Flex>

      <Spacer size={4} axis="vertical" />
    </STableHeaderWrapper>
  )
}
