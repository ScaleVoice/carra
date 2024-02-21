import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { TextBody } from 'components/text/Text'
import { size } from 'core/styles/spacing'
import { color, time } from 'core/styles/variables'

export const SContent = styled(TextBody)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: ${size(2)};
`

export const SContainer = styled.div<{
  variant?: 'dark' | 'light'
  axis?: 'horizontal' | 'vertical'
}>`
  position: relative;

  ${({ axis }) => {
    if (axis === 'vertical') {
      return css`
        height: 100%;
        width: 2px;
      `
    }

    return css`
      width: 100%;
      height: 2px;
    `
  }}

  background-color: ${({ variant }) =>
    color(variant === 'dark' ? 'night-l-650' : 'night-l-800')};
  transition: all ${time('control')} ease-in-out;

  ${SContent} {
    background-color: ${({ variant }) =>
      color(variant === 'dark' ? 'night-l-800' : 'white')};
  }
`
