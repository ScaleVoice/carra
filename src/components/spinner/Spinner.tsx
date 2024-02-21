import { css } from '@emotion/react'
import { ResponsiveValue, getResponsiveStyles } from 'core/styles/responsivity'
import { size } from 'core/styles/spacing'
import { color, radius, time } from 'core/styles/variables'

type Variant = ResponsiveValue<'x-small' | 'small' | 'large'>
type Color = ResponsiveValue<'night' | 'white'>

export function getSpinnerStyles(variant?: Variant, spinnerColor?: Color) {
  return css`
    ${getResponsiveStyles(variant ?? 'large', {
      'x-small': {
        width: size(5),
        height: size(5),
        borderWidth: 2,
        borderStyle: 'solid'
      },
      small: {
        width: size(8),
        height: size(8),
        borderWidth: 3,
        borderStyle: 'solid'
      },
      large: {
        width: size(16),
        height: size(16),
        borderWidth: size(1),
        borderStyle: 'solid'
      }
    })}

    ${getResponsiveStyles(spinnerColor ?? 'night', {
      night: {
        borderColor: color('night-l-800'),
        borderLeftColor: color('night-l-100')
      },
      white: {
        borderColor: color('white', 0.3),
        borderLeftColor: color('white', 0.7)
      }
    })}

    border-radius: ${radius('full')};
    animation: spin ${time('spinner')} infinite linear;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `
}

type Props = {
  className?: string
  // TODO: this should be a "size"
  variant?: Variant
  color?: Color
  testId?: string
}

export function Spinner(props: Props) {
  const { className, testId = 'spinner' } = props

  return (
    <div
      data-testid={testId}
      className={className}
      css={getSpinnerStyles(props.variant, props.color)}
    />
  )
}
