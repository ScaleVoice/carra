import styled from '@emotion/styled'
import { Flex } from 'components/Flex'
import { TextBodyMedium } from 'components/text/Text'
import { size } from 'core/styles/spacing'

export const STableHeaderWrapper = styled(Flex)`
  padding: 0 ${size(10)};
`

export const SHeaderText = styled(TextBodyMedium)`
  letter-spacing: 3px;
  text-transform: uppercase;
`
