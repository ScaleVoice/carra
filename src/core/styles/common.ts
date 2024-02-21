import { css } from '@emotion/react'
import { sideGrid } from 'core/styles/grid'
import { getResponsiveStyles } from 'core/styles/responsivity'
import { size } from './spacing'
import { color, radius } from './variables'

export const layoutGrid = getResponsiveStyles(['mobile', 'tablet', 'desktop'], {
  desktop: sideGrid(12),
  tablet: sideGrid(4),
  mobile: sideGrid(4)
})

export const fillParent = css`
  width: 100%;
  height: 100%;
`

export const textEllipsis = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const invisibleScrollbars = css`
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const styledScrollbars = css`
  scrollbar-width: thin;
  scrollbar-color: ${color('almond')} ${color('almond-l-200')};

  &::-webkit-scrollbar-track {
    background: ${color('almond-l-200')};
  }
  &::-webkit-scrollbar {
    width: ${size(1.5)};
    height: ${size(1.5)};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${color('almond')};
    border-radius: ${radius('full')};
  }
`
