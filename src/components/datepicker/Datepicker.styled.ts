import styled from '@emotion/styled'
import { size } from 'core/styles/spacing'
import { color, radius } from 'core/styles/variables'

export const SDateInput = styled.input`
  width: 100%;
  padding: 14px;

  font-size: ${size(4)};
  border: 2px solid ${color('night-l-700')};
  border-radius: ${radius('input')};
`
