import styled from '@emotion/styled'
import { Button } from 'components/button/Button'
import { size } from 'core/styles/spacing'
import { radius } from 'core/styles/variables'

export const SToolbarButton = styled(Button)`
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
