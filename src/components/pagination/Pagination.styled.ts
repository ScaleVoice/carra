import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ButtonTransparent } from 'components/button/Button'
import { TextBody } from 'components/text/Text'
import { size } from 'core/styles/spacing'
import { color, radius, shadow } from 'core/styles/variables'

export const SContainer = styled.div`
  box-shadow: ${shadow(1)};
  height: ${size(12)};
  display: flex;
  border-radius: ${radius('corner-smaller')};
`

export const SSeparator = styled.div`
  background: ${color('night-l-700')};
  height: 100%;
  width: ${size(0.5)};
`

export const SArrowButton = styled(ButtonTransparent)`
  color: ${color('night-l-100')};
  width: ${size(12)};
`

export const SPageButton = styled(ButtonTransparent)<{ active?: boolean }>`
  width: ${size(10)};
  position: relative;
  height: 100%;

  ${TextBody} {
    color: ${({ active }) =>
      active ? color('night-l-100') : color('night-text')};
  }

  ${({ active }) =>
    active &&
    css`
      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: ${size(0.5)};
        background: ${color('night-l-200')};
        border-radius: ${radius('corner-smallest')};
      }
    `}
`
