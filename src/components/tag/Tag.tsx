import styled from '@emotion/styled'
import { getResponsiveStyles } from 'core/styles/responsivity'
import { size } from 'core/styles/spacing'
import { color, font } from 'core/styles/variables'
import { TagVariant } from 'utils/tags'

export const Tag = styled.span<{
  variant: TagVariant
}>`
  display: inline-block;
  font-family: ${font('text')};

  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  line-height: 18px;

  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;

  border-radius: 3px;

  white-space: nowrap;

  padding: ${size(1)} ${size(2)} calc(${size(1)} - 2px);

  ${({ variant }) => {
    return getResponsiveStyles(variant, {
      primary: {
        color: color('white'),
        background: color('night')
      },
      secondary: {
        color: color('sun-d-500'),
        background: color('sun-l-200')
      },
      tertiary: {
        color: color('night-d-100'),
        background: color('night-l-700')
      },
      warning: {
        color: color('white'),
        background: color('warning')
      },
      'warning-secondary': {
        color: color('warning'),
        background: color('warning-l-100')
      },
      majesty: {
        color: color('majesty'),
        background: color('majesty-l-100')
      },
      sale: {
        color: color('coffee-brown'),
        background: color('sun')
      },
      dark: {
        color: color('white'),
        background: color('black')
      }
    })
  }}
`
