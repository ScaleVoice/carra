import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { getResponsiveStyles, ResponsiveValue } from 'core/styles/responsivity'
import { space } from 'core/styles/spacing'

export const Flex = styled.div<{
  variant: ResponsiveValue<'row' | 'column' | 'row-reverse' | 'column-reverse'>
  gap?: ResponsiveValue<number>
  align?: ResponsiveValue<'start' | 'center' | 'end' | 'stretch'>
  justify?: ResponsiveValue<
    'around' | 'between' | 'stretch' | 'start' | 'center' | 'end'
  >
  wrap?: ResponsiveValue<'wrap' | 'wrap-reverse' | 'nowrap'>
  display?: ResponsiveValue<'default' | 'inline'>
}>`
  display: flex;

  ${({ align }) =>
    getResponsiveStyles(align ?? 'none', {
      start: { alignItems: 'flex-start' },
      center: { alignItems: 'center' },
      end: { alignItems: 'flex-end' },
      stretch: { alignItems: 'stretch' },
      none: {}
    })}

  ${({ justify }) =>
    getResponsiveStyles(justify ?? 'none', {
      around: { justifyContent: 'space-around' },
      between: { justifyContent: 'space-between' },
      start: { justifyContent: 'flex-start' },
      center: { justifyContent: 'center' },
      end: { justifyContent: 'flex-end' },
      stretch: { justifyContent: 'stretch' },
      none: {}
    })}

  ${({ wrap }) =>
    getResponsiveStyles(wrap ?? 'nowrap', {
      wrap: { flexWrap: 'wrap' },
      'wrap-reverse': { flexWrap: 'wrap-reverse' },
      nowrap: { flexWrap: 'nowrap' }
    })}

  ${({ display }) =>
    getResponsiveStyles(display ?? 'default', {
      default: { display: 'flex' },
      inline: { display: 'inline-flex' }
    })}

  ${({ variant, gap }) =>
    getResponsiveStyles(variant ?? 'row', {
      row: css`
        flex-direction: row;
        ${getResponsiveStyles(gap, number =>
          number != null ? space(number, 0) : {}
        )}
      `,
      column: css`
        flex-direction: column;
        ${getResponsiveStyles(gap, number =>
          number != null ? space(0, number) : {}
        )}
      `,
      'row-reverse': css`
        flex-direction: row-reverse;
        ${getResponsiveStyles(gap, number =>
          number != null ? space(0, number) : {}
        )}
      `,
      'column-reverse': css`
        flex-direction: column-reverse;
        ${getResponsiveStyles(gap, number =>
          number != null ? space(0, number) : {}
        )}
      `
    })}
`
