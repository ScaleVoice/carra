import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { styledScrollbars } from 'core/styles/common'
import { inset } from 'core/styles/inset'
import { media } from 'core/styles/media'
import { getResponsiveStyles, ResponsiveValue } from 'core/styles/responsivity'
import { size } from 'core/styles/spacing'
import {
  color,
  definitions,
  radius,
  shadow,
  zIndex
} from 'core/styles/variables'
import { motion } from 'framer-motion'

export const SContent = styled(motion.div)<{
  variant?: ResponsiveValue<'default' | 'large' | 'full'>
  hasFooter?: boolean
  newDesign?: boolean
  isFullMobileStyles: boolean
}>`
  ${({ variant, isFullMobileStyles }) =>
    getResponsiveStyles(variant ?? 'default', {
      default: {
        maxWidth: isFullMobileStyles
          ? 'initial'
          : `min(100vw - ${size(8)}, ${size(92)})`
      },
      large: {
        maxWidth: `min(100vw - ${size(8)}, ${size(220)})`
      },
      full: {
        maxWidth: '100%'
      }
    })}

  border-radius: ${radius('corner')};
  overflow: hidden;

  box-shadow: ${({ isFullMobileStyles }) =>
    isFullMobileStyles ? shadow(1) : shadow(3)};
  background-color: ${color('white')};

  transform-origin: top center;

  @media ${media.lte('mobile')} {
    ${({ isFullMobileStyles }) =>
      isFullMobileStyles &&
      css`
        margin-left: ${size(4)};
        margin-right: ${size(4)};
      `};
  }

  ${({ hasFooter, newDesign }) => {
    if (hasFooter) {
      return css`
        padding-bottom: ${newDesign ? size(18) : size(12)};
      `
    }
    return
  }};
`

export const SHeader = styled.div<{
  padding?: ResponsiveValue<'none' | 'small' | 'large'>
}>`
  ${({ padding }) =>
    getResponsiveStyles(padding ?? 'large', {
      none: {
        padding: 0
      },
      small: {
        padding: size(4)
      },
      large: {
        padding: size(6)
      }
    })};
`

export const SItems = styled.div<{
  isFullHeight?: boolean
  padding?: ResponsiveValue<'none' | 'small' | 'large'>
  isFullMobileStyles: boolean
  height?: string
  scrollbarColor?: keyof (typeof definitions)['c']
}>`
  ${({ padding }) =>
    getResponsiveStyles(padding ?? 'large', {
      none: {
        padding: 0
      },
      small: {
        padding: size(4)
      },
      large: {
        padding: size(6)
      }
    })};

  ${({ isFullHeight }) =>
    !isFullHeight &&
    css`
      max-height: ${size(100)};
      overflow: auto;
    `};

  ${({ height }) =>
    height &&
    css`
      height: ${height};
      overflow: auto;
    `};

  ${styledScrollbars}

  ${({ scrollbarColor }) =>
    scrollbarColor &&
    css`
      &::-webkit-scrollbar-track {
        background: ${color(scrollbarColor)};
      }
    `}
`

export const SWrapper = styled.div<{
  isFullMobileStyles: boolean
  isInModal?: boolean
}>`
  z-index: ${({ isFullMobileStyles, isInModal }) =>
    isFullMobileStyles || isInModal ? zIndex('top') : zIndex('sticky')};
  perspective: 2000px;

  @media ${media.lte('mobile')} {
    ${({ isFullMobileStyles }) =>
      isFullMobileStyles &&
      css`
        position: absolute;
        top: ${size(15)};
        left: 0;
        width: 100%;
      `};
  }
`
export const SBackground = styled(motion.div)`
  position: fixed;
  ${inset(0)}

  background-color: ${color('night', 0.6)};

  z-index: 0;
`
