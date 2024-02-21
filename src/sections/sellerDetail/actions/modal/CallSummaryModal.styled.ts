import styled from '@emotion/styled'
import { Button } from 'components/button/Button'
import { size } from 'core/styles/spacing'

export const SBlackListButton = styled(Button)`
  display: flex;
  gap: ${size(6)};
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;

  text-align: left;
  padding: ${size(6)};
`

export const SIconWrapper = styled.div`
  padding-top: 2px;
`
