import styled from '@emotion/styled'
import { size } from 'core/styles/spacing'
import { color, radius, weight } from 'core/styles/variables'

export const SStepNumber = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  width: ${size(8)};
  height: ${size(8)};

  border-radius: ${radius('full')};
  color: ${color('night-l-100')};
  background-color: ${color('night-l-700')};

  font-size: 14px;
  font-weight: ${weight('medium')};
`
