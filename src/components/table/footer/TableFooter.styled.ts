import styled from '@emotion/styled'
import { Flex } from 'components/Flex'
import { Button } from 'components/button/Button'
import { size } from 'core/styles/spacing'

export const SFooter = styled(Flex)`
  padding: ${size(6)} ${size(10)} ${size(6)};
`

export const SNextPageButton = styled(Button)`
  width: ${size(60)};
`
