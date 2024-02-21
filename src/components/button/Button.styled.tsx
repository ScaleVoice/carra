import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  almond,
  buttonSharedStyles,
  outline,
  primary,
  secondary,
  secondaryOutline,
  tertiary,
  warning,
  warningSecondary,
  whiteOutline
} from 'components/button/Variants'
import { ResponsiveValue, getResponsiveStyles } from 'core/styles/responsivity'
import { size } from 'core/styles/spacing'
import { color, radius, shadow } from 'core/styles/variables'

type ButtonVariant = 'primary' | 'secondary' | 'outline'
type ExtendButtonVariant =
  | 'tertiary'
  | 'secondary-outline'
  | 'warning'
  | 'warning-secondary'
  | 'almond'
type CircleButtonVariant = 'white' | 'circle' | 'whiteOutline'

type CornerSize = 'small' | 'normal'

const getCornerRadius = (cornerRadius: ResponsiveValue<CornerSize>) =>
  getResponsiveStyles(cornerRadius ?? 'normal', {
    normal: css`
      border-radius: ${radius('corner')};
    `,
    small: css`
      border-radius: ${radius('corner-smaller')};
    `
  })

export const SButton = styled.button<{
  variant: ResponsiveValue<ButtonVariant | ExtendButtonVariant>
  cornerRadius?: ResponsiveValue<CornerSize>
}>`
  ${buttonSharedStyles};

  ${({ cornerRadius }) => getCornerRadius(cornerRadius ?? 'normal')};

  ${({ variant }) => {
    return getResponsiveStyles(variant, {
      primary,
      secondary,
      tertiary,
      outline,
      'secondary-outline': secondaryOutline,
      warning,
      'warning-secondary': warningSecondary,
      almond
    })
  }}
`

export const SButtonLink = styled.a<{
  variant: ResponsiveValue<ButtonVariant | ExtendButtonVariant>
  cornerRadius?: ResponsiveValue<CornerSize>
}>`
  ${buttonSharedStyles};

  ${({ cornerRadius }) => getCornerRadius(cornerRadius ?? 'normal')};

  ${({ variant }) => {
    return getResponsiveStyles(variant, {
      primary,
      secondary,
      tertiary,
      outline,
      'secondary-outline': secondaryOutline,
      warning,
      'warning-secondary': warningSecondary,
      almond
    })
  }}
`

export const SButtonCircle = styled.button<{
  variant: ResponsiveValue<ButtonVariant | CircleButtonVariant>
}>`
  ${buttonSharedStyles};

  flex-shrink: 0;
  border-radius: 100%;

  ${({ variant }) => {
    return getResponsiveStyles(variant, {
      primary,
      secondary,
      outline: css`
        ${outline};
        padding: ${size(3)};
      `,
      whiteOutline: css`
        ${whiteOutline};
        padding: ${size(3)};
      `,
      white: css`
        background-color: ${color('white')};

        @media (hover: hover) {
          &:hover {
            color: ${color('almond')};
          }
        }
      `,
      circle: css`
        background-color: ${color('white')};
        color: ${color('night-l-100')};
        box-shadow: ${shadow(3)};

        @media (hover: hover) {
          &:hover {
            color: ${color('night')};
            background: rgba(0, 0, 0, 0.05);
          }
        }

        &:active {
          color: ${color('night')};
        }

        &[disabled] {
          opacity: 0.4;
        }
      `
    })
  }}
`

export const SButtonTransparent = styled.button`
  background: transparent;
  margin: 0;
  padding: 0;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  &[disabled] {
    cursor: unset;
  }
`
