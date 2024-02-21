import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ButtonTransparent } from 'components/button/Button'
import { TextBody } from 'components/text/Text'
import { size } from 'core/styles/spacing'
import { color, time } from 'core/styles/variables'

export const SLabel = styled(TextBody)`
  color: inherit;
  text-align: start;
`

export const SButton = styled(ButtonTransparent)<{ isActive?: boolean }>`
  position: relative;
  display: flex;
  justify-content: flex-start;

  min-height: ${size(14)};
  padding: ${size(1)};

  border: 2px solid ${color('night-l-700')};
  ${({ isActive }) => css`
    color: ${color(isActive ? 'night-l-100' : 'night-text')};
  `};

  transition: all ${time('control')} ease-in-out;

  svg {
    width: ${size(4)};
    height: ${size(4)};
    min-width: ${size(4)};
    min-height: ${size(4)};

    margin-left: ${size(2)};
    margin-right: ${size(3)};

    color: ${color('night-l-200')};
  }

  @media (hover: hover) {
    &:hover {
      border-color: ${color('night-l-650')};
    }
  }
`
