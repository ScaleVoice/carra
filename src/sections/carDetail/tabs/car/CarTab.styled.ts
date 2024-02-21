import styled from '@emotion/styled'
import { Button } from 'components/button/Button'
import { fadeIn } from 'core/styles/animations'
import { size } from 'core/styles/spacing'
import { time } from 'core/styles/variables'

export const SCarFormWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: ${size(6)};
`

export const SSaveButton = styled(Button)`
  font-size: 12px;

  padding: 2px ${size(4)};

  animation: ${fadeIn} ${time('control')} ease-in-out;
`
