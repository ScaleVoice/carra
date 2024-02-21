import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ButtonTransparent } from 'components/button/Button'
import { TextBody } from 'components/text/Text'
import IconChevronDown from 'core/images/icons/IconChevronDown.svg'
import { size } from 'core/styles/spacing'
import { color, time } from 'core/styles/variables'

export const SHeader = styled.div<{ optionsLength: number }>`
  display: grid;

  ${({ optionsLength }) => {
    if (optionsLength === 1) {
      return css`
        grid-template-columns: 1fr;
      `
    }

    if (optionsLength === 2) {
      return css`
        grid-template-columns: 1fr 1fr;
      `
    }

    return css`
      grid-template-columns: 1fr 1fr auto;
    `
  }}

  grid-gap: 2px;

  padding: 2px;

  background-color: ${color('night-l-700')};
`

export const SIcon = styled(IconChevronDown)`
  color: ${color('night-l-100')};
  transition: all ${time('control')} ease-in-out;
`

export const SHeaderItemLabel = styled(TextBody)`
  color: inherit;
`

export const SHeaderItem = styled(ButtonTransparent)<{ isActive?: boolean }>`
  width: 100%;
  padding: ${size(4)};
  transition: all ${time('control')} ease-in-out;

  ${({ isActive }) => css`
    background-color: ${color(isActive ? 'night-l-700' : 'white')};
    color: ${color(isActive ? 'night-l-100' : 'night-text')};

    svg {
      ${isActive && 'transform: rotate(180deg);'};
    }
  `};
`

export const SItems = styled.div<{ length: number }>`
  display: grid;
  grid-gap: ${size(2)};
  ${({ length }) => length > 3 && 'grid-template-columns: 1fr 1fr'};
`
