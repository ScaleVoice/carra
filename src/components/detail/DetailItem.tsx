import { css } from '@emotion/react'
import { Flex } from 'components/Flex'
import { TextBody, TextBodyMedium } from 'components/text/Text'
import { size } from 'core/styles/spacing'
import { color } from 'core/styles/variables'

interface Props {
  label: string
  value?: string | number
}

export function DetailItem({ value, label }: Props) {
  return (
    <Flex
      variant="row"
      justify="between"
      css={css`
        padding: ${size(4)} 0;
        border-bottom: 2px solid ${color('night-l-650')};
      `}
    >
      <TextBody>{label}</TextBody>
      <TextBodyMedium color="gray">{value ?? '-'}</TextBodyMedium>
    </Flex>
  )
}
