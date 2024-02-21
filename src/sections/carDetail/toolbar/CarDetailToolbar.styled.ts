import styled from '@emotion/styled'
import { Button } from 'components/button/Button'
import { size } from 'core/styles/spacing'
import { radius } from 'core/styles/variables'

export const SToolbarIconButton = styled(Button)`
  position: static;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${size(10)};
  height: ${size(10)};
  cursor: pointer;
  padding: 0;

  border-radius: ${radius('full')};
`

export const SToolbarButton = styled(Button)`
  font-size: 14px;
  padding: 0 ${size(4)};
  height: ${size(10)};

  border-radius: ${radius('corner-medium')};
`
