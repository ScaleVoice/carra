import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ButtonTransparent } from 'components/button/Button'
import { TextBody } from 'components/text/Text'
import { media } from 'core/styles/media'
import { size } from 'core/styles/spacing'
import { color, font, radius, time } from 'core/styles/variables'

export const SLabel = styled(TextBody)<{ isSelected?: boolean }>`
  color: inherit;
  font-family: ${font('heading')};

  white-space: nowrap;

  ${({ isSelected }) =>
    isSelected &&
    css`
      && {
        color: ${color('night-l-700')};
        font-family: ${font('text')};
        font-size: 12px;
        line-height: 14px;
      }
    `};
`

export const SContainer = styled(ButtonTransparent)<{
  isActive?: boolean
  isSelected?: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: ${size(12)};

  padding: 0 ${size(3)};

  transition: all ${time('mid-fast')} ease-in-out;
  border: 2px solid ${color('night-l-700')};
  border-radius: ${radius('corner-smallest')};
  color: ${color('night-text')};

  svg {
    color: ${color('night-l-100')};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      border-color: ${color('night-l-100')};
      color: ${color('night-l-100')};

      svg {
        transform: rotate(180deg);
      }
    `};

  ${({ isSelected }) =>
    isSelected &&
    css`
      background-color: ${color('night-l-100')};
      border-color: ${color('night-l-100')};
      color: ${color('white')};

      svg {
        color: ${color('white')};
        transform: none;
      }
    `}

  ${TextBody} {
    color: inherit;
  }

  @media (hover: hover) {
    &:hover {
      border-color: ${color('night-l-100')};
    }
  }

  @media ${media.gt('mobile')} {
    height: ${size(14)};
    padding: 0 ${size(8)};
  }
`

export const SLabels = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`

export const SFiltersButtonIcon = styled.svg`
  margin-left: ${size(2)};
  transition: transform ${time('mid-fast')} ease-in-out;
`
