import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { getResponsiveStyles, ResponsiveValue } from 'core/styles/responsivity'
import { color, definitions, font, weight } from 'core/styles/variables'

function headerVariantFromAs(
  as?: React.ElementType
): 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | undefined {
  if (
    as === 'h1' ||
    as === 'h2' ||
    as === 'h3' ||
    as === 'h4' ||
    as === 'h5' ||
    as === 'h6'
  ) {
    return as
  }

  return undefined
}

export const TextHeader = styled.h1<{
  variant?: ResponsiveValue<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>
  color?: keyof (typeof definitions)['c']
}>`
  color: ${props => (props.color ? color(props.color) : color('night-d-200'))};
  font-family: ${font('heading')};
  font-style: normal;
  font-weight: 500;
  letter-spacing: calc((-1.5 / 63) * 1em);

  ${({ variant, as }) =>
    getResponsiveStyles(variant ?? headerVariantFromAs(as) ?? 'h1', {
      h1: { fontSize: '74px', lineHeight: '80px' },
      h2: { fontSize: '52px', lineHeight: '56px' },
      h3: { fontSize: '36px', lineHeight: '40px' },
      h4: { fontSize: '32px', lineHeight: '40px' },
      h5: { fontSize: '24px', lineHeight: '32px' },
      h6: { fontSize: '18px', lineHeight: '24px' }
    })}
`

export const TextBody = styled.span<{
  variant?: ResponsiveValue<'body' | 'setup' | 'caption'>
  size?: ResponsiveValue<'small' | 'large' | 'x-large'>
  color?: keyof (typeof definitions)['c']
}>`
  display: inline-block;
  color: ${props => (props.color ? color(props.color) : color('night-text'))};

  ${({ variant, size }) =>
    getResponsiveStyles(variant ?? 'body', {
      body: css`
        font-family: ${font('text')};
        ${getResponsiveStyles(size ?? 'large', {
          'x-large': { fontSize: '18px', lineHeight: '24px' },
          large: { fontSize: '16px', lineHeight: '24px' },
          small: { fontSize: '14px', lineHeight: '20px' }
        })}
      `,
      setup: css`
        font-family: ${font('heading')};
        ${getResponsiveStyles(size ?? 'large', {
          'x-large': { fontSize: '18px', lineHeight: '24px' },
          large: { fontSize: '16px', lineHeight: '24px' },
          small: { fontSize: '14px', lineHeight: '16px' }
        })}
      `,
      caption: css`
        font-family: ${font('text')};
        font-size: 13px;
        line-height: 18px;
      `
    })}

  strong {
    font-weight: ${weight('bold')};
  }
`

export const TextBodyBold = styled(TextBody)`
  color: ${props => (props.color ? color(props.color) : color('night-d-200'))};
  font-weight: ${weight('bold')};
`

export const TextBodyMedium = styled(TextBody)`
  font-weight: ${weight('medium')};
`

export const TextSubhead = styled.span<{
  variant?: ResponsiveValue<'normal' | 'nocaps'>
  color?: keyof (typeof definitions)['c']
}>`
  font-family: ${font('heading')};
  font-style: normal;
  font-weight: 500;

  color: ${props => (props.color ? color(props.color) : color('night-l-100'))};

  display: inline-block;

  ${({ variant }) =>
    getResponsiveStyles(variant ?? 'normal', {
      normal: {
        fontSize: 12,
        lineHeight: '18px',
        letterSpacing: 3,
        textTransform: 'uppercase'
      },
      nocaps: {
        fontSize: 15,
        lineHeight: '24px',
        letterSpacing: 1
      }
    })}
`

export const TextOther = styled.span<{
  variant: ResponsiveValue<'label' | 'input-label'>
}>`
  display: inline-block;
  color: ${color('night-text')};

  ${({ variant }) =>
    getResponsiveStyles(variant, {
      label: css`
        font-family: ${font('text')};
        font-size: 11px;
        line-height: 18px;
        letter-spacing: 1px;
        font-weight: ${weight('bold')};
      `,
      'input-label': css`
        font-family: ${font('text')};
        font-size: 12px;
        line-height: 14px;
        font-weight: ${weight('regular')};
      `
    })}

  strong {
    font-weight: ${weight('bold')};
  }
`
