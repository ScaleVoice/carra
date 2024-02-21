import styled from '@emotion/styled'
import { ButtonTransparent } from '../button/Button'
import { color, radius, time } from '../../core/styles/variables'
import { size } from '../../core/styles/spacing'
import { TextBody } from '../text/Text'

import IconCross from 'core/images/icons/IconCross.svg'

export const SChip = styled(ButtonTransparent)`
  position: relative;
  display: flex;
  align-items: center;
  width: auto;

  border: 2px solid ${color('night-l-700')};
  border-radius: ${radius('full')};
  padding: ${size(1)} ${size(3)};
  transition: all ${time('control')} ease-in-out;
  background: ${color('night-l-100')};

  ${TextBody} {
    color: ${color('white')};
  }

  &:disabled {
    cursor: unset;
  }
`

export const SIconRemove = styled(IconCross)`
  margin-left: ${size(1)};
  color: ${color('white')};
`
