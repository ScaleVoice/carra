import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ButtonTransparent } from 'components/button/Button'
import { TextBody } from 'components/text/Text'
import { fadeIn } from 'core/styles/animations'
import { media } from 'core/styles/media'
import { size } from 'core/styles/spacing'
import { color, radius, time, weight } from 'core/styles/variables'

export const SOption = styled(ButtonTransparent)<{ selected: boolean }>`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: ${size(4)};
  border-radius: ${radius('input')};
  transition: all ${time('control')} ease-in-out;

  svg:last-child:not(:first-child) {
    margin-left: auto;
  }
  span {
    &:nth-child(2) {
      margin-left: ${size(2)};

      :not(:last-child) {
        margin-right: auto;
      }
    }
  }

  svg:last-child:not(:first-child) {
    margin-left: auto;
  }
  span {
    &:nth-child(2) {
      margin-left: ${size(2)};

      :not(:last-child) {
        margin-right: auto;
      }
    }
  }

  ${({ selected }) => css`
    border: 2px solid ${selected ? color('night-l-650') : color('night-l-700')};

    ${TextBody} {
      color: ${selected ? color('night-d-200') : color('night-text')};
      font-weight: ${selected ? weight('bold') : weight('regular')};
    }
  `}

  svg {
    animation: ${fadeIn} ${time('control')} ease-in-out;
  }
`

export const SOptions = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: ${({ columns }) =>
    columns > 2 ? `1fr` : `repeat(2, 1fr)`};
  grid-gap: ${size(3)};

  @media ${media.gt('mobile')} {
    grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  }
`
