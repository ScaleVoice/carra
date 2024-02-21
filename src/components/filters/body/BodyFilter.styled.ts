import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ButtonTransparent } from 'components/button/Button'
import { TextBody } from 'components/text/Text'
import { media } from 'core/styles/media'
import { size } from 'core/styles/spacing'
import { color, radius, time, weight } from 'core/styles/variables'

export const SContainer = styled.div<{ noPadding?: boolean }>`
  width: 100%;

  ${({ noPadding }) => css`
    padding: ${size(noPadding ? 0 : 4)};

    @media ${media.gt('tablet')} {
      width: ${size(noPadding ? 146 : 162)};
      padding: ${size(noPadding ? 0 : 8)};
    }
  `}
`

export const SItems = styled(SContainer)`
  display: grid;
  grid-template-columns: repeat(auto-fill, ${size(21)});
  grid-column-gap: ${size(4)};
  grid-row-gap: ${size(5)};
  justify-content: center;
`

export const SImage = styled.div`
  display: flex;

  background-color: ${color('white')};
  border-radius: ${radius('corner')};
  transition: all ${time('control')} ease-in-out;
`

export const SItemLabel = styled(TextBody)<{ isActive?: boolean }>`
  transition: all ${time('control')} ease-in-out;

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${color('night-l-100')};
      font-weight: ${weight('bold')};
    `};
`

export const SItem = styled(ButtonTransparent)<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  ${({ isActive }) =>
    isActive &&
    css`
      ${SImage} {
        background-color: ${color('night-l-200')};
      }
    `};

  @media (hover: hover) {
    &:hover {
      ${SItemLabel} {
        color: ${color('night-l-100')};
      }
    }
  }
`
