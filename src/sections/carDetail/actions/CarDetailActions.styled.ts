import styled from '@emotion/styled'
import { Button } from 'components/button/Button'
import { size } from 'core/styles/spacing'

export const SActionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: ${size(4)};
`

export const SActionButton = styled(Button)`
  padding: ${size(4)} ${size(2)};
  font-size: 16px;
`
