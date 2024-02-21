import isPropValid from '@emotion/is-prop-valid'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { getResponsiveStyles, ResponsiveValue } from 'core/styles/responsivity'
import { size } from 'core/styles/spacing'

export const Spacer = styled('span', {
  shouldForwardProp: prop => isPropValid(prop as string) && prop !== 'size'
})<{
  size: ResponsiveValue<number | string>
  axis?: ResponsiveValue<'horizontal' | 'vertical'>
  grid?: boolean
}>`
  display: block;

  ${({ grid }) =>
    grid &&
    css`
      grid-column-start: col-left;
      grid-column-end: col-right;
    `}

  ${({ size: cssSize, axis }) =>
    getResponsiveStyles(cssSize, value => {
      const serialized = typeof value === 'number' ? size(value) : value

      return (
        getResponsiveStyles(axis, {
          horizontal: css`
            width: ${serialized};
            min-width: ${serialized};
            height: 1px;
            min-height: 1px;
          `,
          vertical: css`
            width: 1px;
            min-width: 1px;
            height: ${serialized};
            min-height: ${serialized};
          `
        }) ??
        css`
          width: ${serialized};
          min-width: ${serialized};
          height: ${serialized};
          min-height: ${serialized};
        `
      )
    })}
`
